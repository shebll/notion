import { Poppins } from "next/font/google";
import Image from "next/image";
const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });
function Logo() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="dark:hidden block">
        <Image src={"/logo.svg"} width={24} height={24} alt="logo" />
      </div>
      <div className="hidden dark:block">
        <Image src={"/logo-dark.svg"} width={24} height={24} alt="logo" />
      </div>
      <p className={`${font.className} font-bold`}>Jotion</p>
    </div>
  );
}

export default Logo;
