import React from 'react';
import DashNav from "../../Components/Nav/DashNav";

const Index = () => {
  return (
    <>
      <DashNav />
      <div className="flex items-center justify-center h-screen pt-[12vh]">
        <img
          className="w-[80vw] h-[80vh] rounded-[3rem]"
          src="/Frame.jpg"
          
        />
      </div>
    </>
  );
};

export default Index;

