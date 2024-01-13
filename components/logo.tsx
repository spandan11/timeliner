import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

interface LogoProps {
  logoclassName?: string;
  iconclassName?: string;
}

const Logo = ({ logoclassName, iconclassName }: LogoProps) => {
  return (
    <div
      className={cn(
        "text-xl font-bold text-center flex items-center gap-x-2 justify-center",
        poppins.className,
        logoclassName
      )}
    >
      <CalendarIcon
        className={cn("h-5 w-5 font-bold text-blue-800", iconclassName)}
      />
      <h2 className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
        Timeliner
      </h2>
    </div>
  );
};

export default Logo;
