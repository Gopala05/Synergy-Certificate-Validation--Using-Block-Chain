import React from "react";

import {
  Logo,
  Button,
  CheckBox,
  Card,
  Footer,
  Filter,
  // Donate,
  Form,
  Notification,
  Profile,
  Login,
  Header,
  SignUp,
  Upload,
} from "../Components";

const layout = () => {
  return (
    <div className="home">
      <Logo />
      <Button />
      <CheckBox />
      <Card />
      <Footer />
      <Filter />
      {/* <Donate /> */}
      <Form />
      <Notification />
      <Profile />
      <Login />
      <Header />
      <SignUp />
      <Upload />
      {/* <Product /> */}
    </div>
  );
};
export default layout;
