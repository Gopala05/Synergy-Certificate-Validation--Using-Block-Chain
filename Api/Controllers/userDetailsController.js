const userDetailsModal = require("../Model/userDetailsModal");
const userModal = require("../Model/userModal");

exports.CreateUserDetails = async (req, res, next) => {
  const inputData = req.body;

  try {
    if (!inputData.userName) {
      return res.status(400).json({ message: "User name is required." });
    }

    const user = await userModal.findOne({ userName: inputData.userName });

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    // Set fields with either real or dummy/default values
    const data = {
      // Keep real or null values for basic fields
      userName: inputData.userName || null,
      name: inputData.name || null,
      aadhar: inputData.aadhar || null,
      profile: inputData.profile || null,
      userEmails: inputData.userEmails || [],
      role: inputData.role || "Developer",
      gitHub: inputData.gitHub || "https://github.com/dummyUser",
      linkedIn: inputData.linkedIn || "https://linkedin.com/in/dummyUser",
      slack: inputData.slack || "@dummyUser",
      leetCode: inputData.leetCode || "https://leetcode.com/dummyUser",
      mobileNumber: inputData.mobileNumber || "0000000000",
      alternativeMobile: inputData.alternativeMobile || "1111111111",
      location: inputData.location || "Bangalore, India",
      bio:
        inputData.bio ||
        "A passionate developer eager to build impactful digital solutions.",

      // Dummy Data for complex/optional fields
      careerTitles: inputData.careerTitles || [
        "Frontend Developer",
        "Backend Developer",
      ],
      careers: inputData.careers || [
        "Worked on user interfaces using React.",
        "Built APIs with Node.js and MongoDB.",
      ],
      qualificationYears: inputData.qualificationYears || ["2018", "2021"],
      qualificationTitles: inputData.qualificationTitles || [
        "B.Sc Computer Science",
        "M.Sc Computer Science",
      ],
      qualificationsFrom: inputData.qualificationsFrom || [
        "XYZ University",
        "ABC College",
      ],

      hobbies: inputData.hobbies || ["Reading", "Gaming", "Traveling"],
      softSkills: inputData.softSkills || [
        "Communication",
        "Teamwork",
        "Problem Solving",
      ],

      experiencePeriods: inputData.experiencePeriods || [
        "2022-2023",
        "2023-Present",
      ],
      experienceTitles: inputData.experienceTitles || [
        "Junior Developer",
        "Software Engineer",
      ],
      experiencesFrom: inputData.experiencesFrom || [
        "TechCorp",
        "DevSolutions",
      ],

      workSkills: inputData.workSkills || [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "HTML",
        "CSS",
      ],
      projects: inputData.projects || ["Portfolio Website", "Task Manager App"],
      projectsURL: inputData.projectsURL || [
        "https://github.com/dummyUser/portfolio",
        "https://github.com/dummyUser/task-manager",
      ],

      // Certificates (keep as is or null)
      sslcCertificate: inputData.sslcCertificate || null,
      puCertificate: inputData.puCertificate || null,
      ugCertificate: inputData.ugCertificate || null,
      resume: inputData.resume || null,
    };

    const userDetail = await userDetailsModal.create(data);

    return res
      .status(201)
      .json({ message: "User Details Created.", userDetails: userDetail });
  } catch (error) {
    console.error("Error in Creating User Details: ", error);
    next(error);
  }
};

exports.UpdateUserDetails = async (req, res, next) => {
  const updateData = req.body;
  const userName = req.body.userName;

  try {
    if (!userName) {
      return res.status(400).json({ message: "User name is required." });
    }

    const user = await userModal.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    const updatedUserDetails = await userDetailsModal.findOneAndUpdate(
      { userName },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUserDetails) {
      return res.status(404).json({ message: "User Details Not Found." });
    }

    return res.status(200).json({
      message: "User Details Updated.",
      userDetails: updatedUserDetails,
    });
  } catch (error) {
    console.error("Error in Updating User Details: ", error);
    next(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  const { userName } = req.params;
  try {
    if (!userName) {
      return res.status(404).json({ message: "UserName is required." });
    }

    const userDetails = await userDetailsModal.findOne({ userName });

    if (!userDetails) {
      return res.status(404).json({ message: "User Details Not Found." });
    }

    return res.status(200).json({
      message: "User Details Found.",
      userDetails: userDetails,
    });
  } catch (error) {
    console.log("Error in Fetching User Details: ", error);
    next(error);
  }
};
