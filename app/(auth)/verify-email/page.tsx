import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface verifyEmailProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmail = ({ searchParams }: verifyEmailProps) => {
  const token = searchParams.token;
  return (
    <div className="flex flex-col items-center justify-between gap-8">
      <Logo />
      <Image
        className="self-center"
        src={"/verify-email.png"}
        alt="verify email"
        width={250}
        height={250}
      />
      {token && typeof token === "string" && (
        <div className="flex flex-col items-center gap-6">
          <p className="text-lg">
            Please verify your email by Clicking button below
          </p>
          <Button size={"lg"} className="p-8 text-lg">
            Verify your email
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
