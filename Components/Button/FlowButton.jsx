import { useRouter } from "next/navigation";

const FlowButton = ({ children, backgroundImage, navigate }) => {
  const router = useRouter();

  return (
    <button
      className="relative btn border-none text-white font-bold py-4 px-5 lg:px-5 rounded-xl lg:rounded-full shadow-lg overflow-hidden w-full lg:w-[40vw] h-[12vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => router.push(navigate)}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      <div className="relative z-10 rounded-xl lg:rounded-full bg-white/20 flex w-full h-full justify-center">
        <span className="flex justify-center text-xl lg:text-4xl p-5 lg:p-0 items-center">
          {children}
        </span>
      </div>
    </button>
  );
};

export default FlowButton;
