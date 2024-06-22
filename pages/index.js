// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import axios from "axios";

// import {
//   Button,
//   Card,
//   Filter,
//   Footer,
//   Form,
//   Header,
//   Logo,
//   Notification,
//   Product,
//   Profile,
//   Upload,
// } from "../Components";
// import { useStateContext } from "../Context/NFTs";
// import images from "../Components/Image/client/index";

// const Home = () => {
//   const {
//     address,
//     contract,
//     connect,
//     disconnect,
//     userBalance,
//     setUserBalance,
//     isLoading,
//     setIsLoading,

//     // Functions
//     UploadImage,
//     getAllImages,
//     singleImage,
//     donation,

//     // APIs
//     getAllNFTsAPI,
//     getSingleNFTAPI,
//   } = useStateContext();

//   const [openProfile, setOpenProfile] = useState(false);
//   const [closeForm, setCloseForm] = useState(true);
//   const [file, setFile] = useState(null);
//   const [display, setDisplay] = useState(null);
//   const [notification, setNotification] = useState("");
//   const [allImages, setAllImages] = useState([]);
//   const [activeSelect, setActiveSelect] = useState("Old Images");
//   const [imagesCopy, setImagesCopy] = useState([]);

//   // Get Data
//   const oldImages = [];

//   const fetchImages = async () => {
//     const images = await getAllImages();
//     setAllImages(images);

//     // NFT API
//     // const apiImages = await getAllNFTsAPI();
//   };
//   useEffect(() => {
//     if (contract) fetchImages();
//   }, [address, contract]);

//   if (allImages.length == 0) {
//     console.log("Loading...");
//   } else {
//     allImages.map((image) => oldImages.push(image));
//   }

//   // Image Data
//   const [imageInfo, setImageInfo] = useState({
//     title: "",
//     description: "",
//     certificateID: "",
//     userEmail: "",
//     organisation: "",
//   });

//   const handleFormChange = (fieldName, e) => {
//     setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
//   };

//   // Upload
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setCloseForm(false);
//     setIsLoading(true);

//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `aafa084e3b5816bcb281`,
//             pinata_secret_api_key: `8d914aafe2a6ae9683580fa94b6f77cfc28e1745ad95f909b5435a529a47922a`,
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

//         await UploadImage({
//           ...imageInfo,
//           certificate: image,
//         });

//         setFile(null);
//       } catch (error) {
//         console.log("Error in Uploading Image: ", error);
//       }
//     }
//     setFile(null);
//   };

//   // Retrive Image
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];

//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     e.preventDefault();
//   };

//   // Take Image
//   const onImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setDisplay(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   return (
//     <div className="home">
//       {/* <Header notification={notification} setNotification={setNotification} />
//       <div className="header">
//         <h1>Craete 1000 NFTs for Free</h1>
//       </div> */}

//       {/* Upload */}
//       <div className="upload">
//         <Upload
//           onImageChange={onImageChange}
//           display={display}
//           address={address}
//           retrieveFile={retrieveFile}
//         />

//         <div className="upload-info">
//           <h1>Welcome to Certificate Validation System</h1>
//           <p>
//             Upload your image file here and validate a unique digital
//             certificate.
//           </p>

//           <div className="avatar">
//             <Button
//               address={address}
//               connect={connect}
//               disconnect={disconnect}
//               file={file}
//             />

//             {address && (
//               <p>
//                 <Image
//                   className="avatar_img"
//                   src={images.client2}
//                   alt="Image"
//                   width={40}
//                   height={40}
//                   onClick={() => setOpenProfile(true)}
//                 />
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <h1 className="subheading">All Certificates</h1>
//       {/* Card */}

//       {/* {allImages.length == 0 ? (
//         <Logo />
//       ) : allImages == undefined ? (
//         <h1>No Images</h1>
//       ) : (
//         <>
//           <Filter
//             setImageCopy={setImagesCopy}
//             imagesCopy={imagesCopy}
//             setAllImages={setAllImages}
//             allImages={allImages}
//             oldImages={oldImages}
//             activeSelect={activeSelect}
//             setActiveSelect={setActiveSelect}
//           />
//           <div className="card">
//             {allImages.map((image, index) => (
//               <Card
//                 key={index + 1}
//                 index={index}
//                 image={image}
//                 setNotification={setNotification}
//               />
//             ))}
//           </div>
//         </>
//       )} */}

//       {/* <Footer /> */}

//       {/* Notification */}
//       {notification !== "" && (
//         <Notification
//           notification={notification}
//           setNotification={setNotification}
//         />
//       )}

//       {/* Profile */}
//       {openProfile && (
//         <div className="profile">
//           <Profile
//             setOpenProfile={setOpenProfile}
//             userBalance={userBalance}
//             address={address}
//           />
//         </div>
//       )}

//       {/* Loader */}
//       {isLoading && (
//         <div className="loader">
//           <Logo />
//         </div>
//       )}

//       {/* Form */}
//       {file && closeForm && (
//         <div className="form">
//           <div className="form_inner">
//             <Form
//               setFile={setFile}
//               setDisplay={setDisplay}
//               handleFormFieldChange={handleFormChange}
//               handleSubmit={onSubmitHandler}
//               // setCategory={setCategory}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;



import React, { useEffect } from "react";
import Nav from "../Components/Nav/Nav";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import UploadandVerify from "../Components/Upload-and-Verify/UploadandVerify";
import Blog from "../Components/Blog/Blog";
import Contactus from "../Components/ContactUs/Contactus";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav />
      {/* <div className="justify-center flex fixed">
        <hr className="w-[90vw]" />
      </div> */}
      <Home />
      <About />
      <UploadandVerify />
      <Blog />
      <Contactus />
      <hr />
      <footer className="text-center bg-[#02291B] p-3 relative">
        <p className="font-semibold text-white m-1 text-xl">
          © Copyright 2024 |
          <span className="ml-1">All Copyrights Reserved </span>| SYNERGY
        </p>
      </footer>
    </>
  );
};

export default Landing;
