import { SignIn } from "@clerk/nextjs";

const UserLogin = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center back">
      <SignIn />
    </div>
  );
};

export default UserLogin;
