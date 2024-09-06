import React from "react";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/Button";
import CheckBox from "../Components/CheckBox/CheckBox";
import Upload from "../Components/Upload/Upload";
import Card from "../Components/Card/Card";
import Footer from "../Components/Footer/Footer";
import Form from "../Components/Form/Form";

const Layout = () => {
  return (
    <div className="home">
      <Logo />
      <Button />
      <CheckBox />
      <Upload />
      <Card />
      <Footer />
      <Form />
    </div>
  );
};
export default Layout;
