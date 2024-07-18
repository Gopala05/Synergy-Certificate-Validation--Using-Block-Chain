import { useRouter } from "next/navigation";

const HomeButton = ({ children, backgroundImage, navigate }) => {
  const router = useRouter();

  return (
    <button
      className="relative btn text-white font-bold py-4 px-8 rounded-md shadow-lg overflow-hidden w-full lg:w-[40vw] lg:h-[12vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => router.push(navigate)}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      <div className="relative z-10 rounded-md bg-white/20 flex w-full h-full justify-center">
        <span className="flex justify-center text-3xl items-center">
          {children}
        </span>
      </div>
    </button>
  );
};

export default HomeButton;
