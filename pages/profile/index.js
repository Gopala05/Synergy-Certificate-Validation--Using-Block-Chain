import { useEffect, useRef, useState } from "react";
import { Input, Button, Upload, Card, Row, Col } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Logo from "../../Components/Logo/Logo";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PinataSDK } from "pinata";

const FIELD_LIMITS = {
  career: 4,
  qualification: 4,
  experience: 4,
  project: 5,
  hobbies: 7,
  softSkills: 7,
  workSkills: 10,
};

const READ_ONLY_FIELDS = [
  "userEmails",
  "aadhar",
  "userName",
  "name",
  "mobileNumber",
];

const PascalCase = (field) =>
  field
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());

const removeMongoMeta = (data) => {
  const cleaned = { ...data };
  delete cleaned._id;
  delete cleaned.__v;
  return cleaned;
};

const PortfolioProfileUpdate = () => {
  const [userData, setUserData] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [file, setFile] = useState();
  const toastShownRef = useRef(false);
  const router = useRouter();

  const handleImage = (file) => {
    const reader = new FileReader();
    setFile(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePreview(reader.result);
    };
  };

  const fetchUserData = async (userName) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/userdetails/getdetails/${userName}`);
      const cleanData = removeMongoMeta(res.data.userDetails);
      setUserData(cleanData);
      setProfilePreview(cleanData.profile);
      toast.success("User data loaded");
    } catch {
      toast.error("Failed to fetch user data.");
    }
  };

  const handleChange = (field, value, index) => {
    setUserData((prev) => {
      if (index !== null) {
        const arr = [...prev[field]];
        arr[index] = value;
        return { ...prev, [field]: arr };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleGroupedChange = (group, index, subIndex, value) => {
    const map = {
      career: ["careerTitles", "careers"],
      qualification: [
        "qualificationYears",
        "qualificationTitles",
        "qualificationsFrom",
      ],
      experience: ["experiencePeriods", "experienceTitles", "experiencesFrom"],
      project: ["projects", "projectsURL"],
    };
    const fields = map[group];
    const updated = { ...userData };
    updated[fields[subIndex]][index] = value;
    setUserData(updated);
  };

  const handleAddGroup = (group) => {
    const map = {
      career: ["careerTitles", "careers"],
      qualification: [
        "qualificationYears",
        "qualificationTitles",
        "qualificationsFrom",
      ],
      experience: ["experiencePeriods", "experienceTitles", "experiencesFrom"],
      project: ["projects", "projectsURL"],
    };
    const fields = map[group];
    if ((userData[fields[0]]?.length || 0) >= FIELD_LIMITS[group]) {
      toast.error(`${PascalCase(group)} limit reached`);
      return;
    }
    const updated = { ...userData };
    fields.forEach((f) => updated[f].push(""));
    setUserData(updated);
  };

  const handleDiscardGroup = (group, index) => {
    const map = {
      career: ["careerTitles", "careers"],
      qualification: [
        "qualificationYears",
        "qualificationTitles",
        "qualificationsFrom",
      ],
      experience: ["experiencePeriods", "experienceTitles", "experiencesFrom"],
      project: ["projects", "projectsURL"],
    };
    const fields = map[group];
    const updated = { ...userData };
    fields.forEach((f) => updated[f].splice(index, 1));
    setUserData(updated);
  };

  const handleArrayAdd = (field) => {
    if (userData[field].length >= FIELD_LIMITS[field]) {
      toast.error(`${PascalCase(field)} limit reached`);
      return;
    }
    setUserData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleFileUpload = async (field, file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/upload`, formData);
      const url = res.data.url;
      setUserData((prev) => ({ ...prev, [field]: url }));
      if (field === "profile") setProfilePreview(url);
      toast.success(`${PascalCase(field)} uploaded`);
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleUpdate = async () => {
    try {
      if (file) {
        // Pinata SDK
        const pinata = new PinataSDK({
          pinataJwt: process.env.PINATA_JWT,
          pinataGateway: process.env.PINATA_GATEWAY,
        });

        // Create a new FormData instance
        const formData = new FormData();

        // Append the file
        formData.append("file", file);

        // Pinata Metadata
        const pinataMetadata = JSON.stringify({
          name: `${userData.userName} Profile Image`, // You can customize this
        });
        formData.append("pinataMetadata", pinataMetadata);

        // Pinata Options
        const pinataOptions = JSON.stringify({
          cidVersion: 1,
        });
        formData.append("pinataOptions", pinataOptions);

        // Pinata API Request
        const request = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.PINATA_JWT}`,
            },
            body: formData,
          }
        );

        if (!request.ok) {
          throw new Error("Pinata request failed");
        }

        const imageUpload = await request.json();

        if (!imageUpload?.IpfsHash) {
          throw new Error("Failed to retrieve IPFS hash");
        }

        // Adding to the Group (optional step for organization)
        const group = await pinata.groups.addCids({
          groupId: process.env.PINATA_GROUP_ID,
          cids: [imageUpload.IpfsHash],
        });

        // If adding to group was successful
        if (group === "OK") {
          const newProfile = `https://gateway.pinata.cloud/ipfs/${imageUpload.IpfsHash}`;

          const updatedUserData = {
            ...userData,
            profile: newProfile,
          };

          // Use updatedUserData for the PUT request
          await axios.put(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/userdetails/update`, updatedUserData);

          toast.success("Profile updated!");
        } else {
          throw new Error("Failed to add to group");
        }
      } else {
        await axios.put(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/userdetails/update`, userData);
        toast.success("Profile updated!");
      }
    } catch (error) {
      toast.error("Update failed.");
      console.error(error);
    }
  };

  useEffect(() => {
    const userdata = localStorage.getItem("user-info");
    if (!userdata) {
      router.replace("/user-login");
      if (!toastShownRef.current) {
        toast.error("Please Login First", {
          icon: "🚫",
        });
        toastShownRef.current = true;
      }
      return;
    }
    const user = JSON.parse(userdata);
    fetchUserData(user.userName);
  }, [router]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] text-white">
        <Logo />
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 md:p-10 space-y-8">
      <div className="flex justify-between top-28 left-8 lg:top-28 z-30">
        <span className="text-white text-3xl font-semibold">Edit Profile</span>
        <button
          onClick={() => router.back()}
          type="primary"
          className="btn bg-gradient-to-r from-green-400 to-green-600 text-black font-bold text-lg"
        >
          <RiArrowGoBackFill />
          Back
        </button>
      </div>

      {/* Static Fields */}
      <Card>
        <Row gutter={16}>
          {Object.entries(userData).map(([field, value]) => {
            if (
              [
                "careerTitles",
                "careers",
                "qualificationYears",
                "qualificationTitles",
                "qualificationsFrom",
                "experiencePeriods",
                "experienceTitles",
                "experiencesFrom",
                "projects",
                "projectsURL",
                "userEmails",
                "hobbies",
                "softSkills",
                "workSkills",
              ].includes(field)
            )
              return null;

            if (
              ["sslcCertificate", "puCertificate", "ugCertificate"].includes(
                field
              )
            ) {
              return null;
            }
            if (["resume"].includes(field)) {
              return (
                <Col span={12} key={field}>
                  <div className="mb-4">
                    <label className="font-medium block mb-1">
                      {PascalCase(field)}
                    </label>
                    <Upload
                      beforeUpload={(file) => {
                        handleFileUpload(field, file);
                        return false;
                      }}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload {PascalCase(field)}
                      </Button>
                    </Upload>
                    {value && (
                      <a
                        href={value}
                        className="text-blue-600 mt-1 block"
                        target="_blank"
                      >
                        View File
                      </a>
                    )}
                  </div>
                </Col>
              );
            }

            if (field === "profile") {
              return (
                <Col span={12} key={field}>
                  <div className="mb-4">
                    <label className="font-medium block mb-1">
                      Profile Picture
                    </label>
                    <img
                      src={profilePreview}
                      className="w-24 h-24 object-cover rounded-full mb-2"
                      alt="Profile Preview"
                    />
                    <Upload
                      showUploadList={false}
                      beforeUpload={(file) => {
                        handleImage(file);
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload New Profile
                      </Button>
                    </Upload>
                  </div>
                </Col>
              );
            }

            return (
              <Col span={12} key={field}>
                <div className="mb-4">
                  <label className="font-medium block mb-1">
                    {PascalCase(field)}
                  </label>
                  <Input
                    value={value}
                    disabled={READ_ONLY_FIELDS.includes(field)}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>

      {/* Grouped Fields */}
      {["career", "qualification", "experience", "project"].map((group) => {
        const map = {
          career: ["careerTitles", "careers"],
          qualification: [
            "qualificationYears",
            "qualificationTitles",
            "qualificationsFrom",
          ],
          experience: [
            "experiencePeriods",
            "experienceTitles",
            "experiencesFrom",
          ],
          project: ["projects", "projectsURL"],
        };
        const fields = map[group];
        return (
          <Card
            key={group}
            title={PascalCase(group)}
            extra={
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={() => handleAddGroup(group)}
              >
                Add
              </Button>
            }
          >
            {userData[fields[0]]?.map((_, idx) => (
              <Row gutter={16} key={idx} className="mb-2">
                {fields.map((f, subIdx) => (
                  <Col span={8} key={f}>
                    <Input
                      value={userData[f][idx]}
                      placeholder={PascalCase(f)}
                      onChange={(e) =>
                        handleGroupedChange(group, idx, subIdx, e.target.value)
                      }
                    />
                  </Col>
                ))}
                <Col span={2}>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDiscardGroup(group, idx)}
                  />
                </Col>
              </Row>
            ))}
          </Card>
        );
      })}

      {/* Array Inputs */}
      {["userEmails", "hobbies", "softSkills", "workSkills"].map((field) => (
        <Card
          key={field}
          title={PascalCase(field)}
          extra={
            !READ_ONLY_FIELDS.includes(field) && (
              <Button size="small" onClick={() => handleArrayAdd(field)}>
                + Add
              </Button>
            )
          }
        >
          {userData[field]?.map((val, index) => (
            <Input
              key={index}
              className="mb-2"
              value={val}
              disabled={READ_ONLY_FIELDS.includes(field)}
              onChange={(e) => handleChange(field, e.target.value, index)}
            />
          ))}
        </Card>
      ))}

      <Button
        type="primary"
        icon={<SaveOutlined />}
        onClick={handleUpdate}
        size="large"
        className="w-full"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PortfolioProfileUpdate;
