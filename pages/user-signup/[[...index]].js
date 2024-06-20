import { SignUp } from "@clerk/nextjs";

const UserSignUp = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center back">
      <SignUp />
    </div>
  );
};

export default UserSignUp;
