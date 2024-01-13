import React from "react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Socials = () => {
  return (
    <div className="flex flex-col gap-4 space-y-2 w-full">
      <div className="flex items-center justify-center gap-4 w-full">
        <Button variant={"outline"} className="w-full py-4 gap-2">
          <GitHubLogoIcon className="w-6 h-6" /> Github
        </Button>
        <Button variant={"outline"} className="w-full py-4 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 488 512"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          Google
        </Button>
      </div>
      <div className="flex items-center">
        <div className="flex-grow border-t border-zinc-200"></div>
        <div className="text-xs text-gray-500 text-center mx-4">
          OR CONTINUE WITH
        </div>
        <div className="flex-grow border-t border-zinc-200"></div>
      </div>
    </div>
  );
};

export default Socials;
