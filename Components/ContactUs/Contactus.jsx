import { Button, Col, Row } from "antd";
import React from "react";
import {
  RiArrowRightLine,
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
} from "react-icons/ri";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import Logo from "../Logo/Logo";

const Contactus = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [loading, setIsLoading] = React.useState(false);

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      if (!query.trim() || !email.trim() || !name.trim()) {
        toast.error("Please provide all the Details");
        return;
      }
      setIsLoading(true);

      const MailParams = {
        from_name: name,
        email_id: email,
        message: query,
        year: new Date().getFullYear(),
      };

      // const response = await emailjs.send(
      //   process.env.NEXT_PUBLIC_SERVICE_ID_FOR_SUPPORT,
      //   process.env.NEXT_PUBLIC_TEMPLATE_ID_FOR_SUPPORT,
      //   MailParams,
      //   process.env.NEXT_PUBLIC_USER_ID_FOR_SUPPORT
      // );

      if (response.status === 200) {
        setIsLoading(false);
        setName("");
        setEmail("");
        setQuery("");
        toast.success("Email sent successfully!");
      } else {
        setIsLoading(false);
        setName("");
        setEmail("");
        setQuery("");
        toast.success(
          "Something went wrong, Please Submit the Query again later"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in sending email: ", error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <div id="contact" className="h-[85vh] p-20 flex flex-col justify-center">
      <label className="flex justify-center items-center text-5xl font-bold">
        Contact Us
      </label>
      <Row className="flex p-20 pt-12 mt-14">
        <Col lg={11}>
          <div className="flex justify-start text-3xl font-bold items-center">
            <img src="/Logo.png" alt="Logo" className="w-24" />
            Synergy
          </div>
          <div className="flex justify-center text-justify text-xl w-full ml-6 mt-5">
            <p>
              Utilizing advanced encryption and security protocols, e-vaults
              ensure that sensitive information remains protected from
              unauthorized access and tampering. E-vaults used for storing
              educational certificates, legal documents, and other vital records
              due to their convenience, accessibility, and enhanced security
              features.
            </p>
          </div>
          <div className="flex justify-center text-lg ml-6 mt-10 gap-10">
            <Button className="bg-transparent border-[#22674E] border-2 text-white rounded-full px-5 py-8">
              <RiInstagramLine className="w-6 h-6" />
            </Button>

            <Button className="bg-transparent border-[#22674E] border-2 text-white rounded-full px-5 py-8">
              <RiFacebookLine className="w-6 h-6" />
            </Button>

            <Button className="bg-transparent border-[#22674E] border-2 text-white rounded-full px-5 py-8">
              <RiLinkedinLine className="w-6 h-6" />
            </Button>
          </div>
        </Col>
        <Col lg={1} className="flex justify-center mx-12">
          <div className=" right-0 top-0 bottom-0 border-r-2 border-gray-300"></div>
        </Col>
        <Col lg={10}>
          <div className="flex justify-center items-center mt-14">
            <div className="relative flex justify-center items-center w-full">
              <input
                className="w-[50vw] h-14 rounded-full pr-10 bg-[#02291B] text-center hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="relative flex justify-center items-center w-full">
              <input
                className="w-[50vw] h-14 rounded-full pr-10 bg-[#02291B] text-center hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="relative flex justify-center items-center w-full">
              <textarea
                className="w-[50vw] rounded-full pr-10 bg-[#02291B] text-center hover:bg-[#02291B] border-2 border-[#22674E] hover:border-[#22674E] placeholder-white placeholder:font-bold text-xl p-5 placeholder:items-center items-center"
                placeholder="Query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={(e) => handleEmail(e)}
              className="mt-8 btn bg-[#15C586] border-0 text-black rounded-full font-bold"
            >
              Send <RiArrowRightLine className="font-bold text-xl" />
            </Button>
          </div>
        </Col>
      </Row>
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default Contactus;
