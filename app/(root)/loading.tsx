import Image from "next/image";
import loader from "@/assets/loader.gif";
const Loading = () => {
  return (
    <div className="flex m-auto items-center justify-center w-full h-full">
      <Image src={loader} height={100} width={100} alt="loading" />
    </div>
  );
};

export default Loading;
