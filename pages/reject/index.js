import { Checkbox, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { RiHome4Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import axios from "axios";
import decryptText from "../../utils/Decrypt";
import emailjs from "@emailjs/browser";
import { useStateContext } from "../../Context/NFTs";
import { Logo } from "../../Components";

const Reject = () => {
  const { isLoading, setIsLoading } = useStateContext();
  const router = useRouter();

  const [checked, setChecked] = React.useState(false);
  const [id, setID] = React.useState("");
  const [request, setRequest] = React.useState("");
  const toastShownRef = React.useRef(false);

  const CheckID = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/v1/link/check/${id}`,
        withCredentials: true,
      });
      if (response.data.status == "OK") {
        setID(router.query.id);
        return response;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(`Error in Fetching the Request: ${error}`);
    }
  };

  React.useEffect(() => {
    if (router.query && router.query.id) {
      const fetchData = async () => {
        try {
          const response = await CheckID(router.query.id);
          setRequest(response?.data.Request || "");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [router.query]);

  // Key Borad Listener
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleConfirm(event);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [handleEnterKeyPress]);

  // Handling Confirm
  const handleConfirm = async (e) => {
    e.preventDefault();

    if (id) {
      setIsLoading(true);
      try {
        const response = await axios({
          method: "PUT",
          url: `/api/v1/link/reject/${request._id}`,
          withCredentials: true,
        });

        if (response.data.status === "OK") {
          setIsLoading(false);
          setChecked(false);
          toast.success(response?.data?.message);
          router.push("/");
        } else if (response.data.status === "Bad Request") {
          setIsLoading(false);
          toast.error(response.data.message);
        } else {
          setIsLoading(false);
          toast.error(error.response?.data?.message || "Internal Server Error");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response?.data?.message || "Internal Server Error");
        console.error("Error in Link Now: ", error);
      }
    } else {
      setIsLoading(false);
      toast.error("Invalid request");
    }
  };

  // Handling Route Protection
  React.useEffect(() => {
    const navigate = () => {
      if (!id) {
        router.replace("/404");
        if (!toastShownRef.current) {
          toast.error("Invalid Request", {
            icon: "🚫",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          toastShownRef.current = true;
        }
      }
    };

    const intervalId = setInterval(navigate, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval
  }, [router.query, id]);

  if (!id) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  return (
    <div className="h-[100vh] bg-white">
      <Row className="flex justify-center items-center">
        <Col lg={12} className="h-[100vh] hidden lg:block">
          <img
            src="./Reject_Metamask.png"
            alt="Reject Image"
            className="h-[100vh] text-black w-full rounded-full rounded-s-none"
          />
        </Col>
        <Col
          lg={12}
          className="p-20 pt-10 h-[100vh] w-full justify-start flex flex-col"
        >
          <div className="flex justify-end items-start">
            <button
              onClick={() => router.push("/")}
              className="btn bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
            >
              Home <RiHome4Fill />
            </button>
          </div>

          <div className="flex flex-col justify-center h-[100vh]">
            <label className="text-black flex justify-center font-bold text-6xl">
              Reject
              <span className="text-[#f6851b]">&nbsp;Account</span>!
            </label>
            <p className="text-black font-bold text-[1.3rem] text-center flex justify-center mt-3">
              Please ensure you have rejected the linking of both accounts to
              avoid any errors. If not, please report it to us.
            </p>

            <div className="mt-5 flex justify-center">
              <Checkbox
                className={`text-xl ${checked ? "font-bold" : "font-semibold"}`}
                onChange={(e) => setChecked(e.target.checked)}
              >
                By Checking, you confirm that you are rejecting the linking of
                accounts.
              </Checkbox>
            </div>

            <div className="flex justify-center">
              <button
                disabled={!checked}
                onClick={handleConfirm}
                className={`mt-8 btn hover:text-black bg-gradient-to-r from-green-400 to-green-600 text-xl w-full border-0 text-white rounded-2xl font-bold transition-transform duration-300 ease-in-out ${
                  checked
                    ? "hover:shadow-2xl hover:shadow-green-600 hover:-translate-y-2"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Reject
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-black font-semibold text-base mt-2">
                By clicking on <i>confirm</i> you agree to &nbsp;
                <a
                  href="/Terms_and_Conditions.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline underline"
                >
                  Terms of Services
                </a>
                &nbsp;|&nbsp;
                <a
                  href="/Privacy_Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline underline"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default Reject;
