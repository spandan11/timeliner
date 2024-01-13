import Link from "next/link";
import Logo from "@/components/logo";
import Socials from "@/app/(auth)/_components/socials";

interface FormWrapperProps {
  headerLabel: string;
  backbuttonLabel: string;
  backbuttonHref: string;
  backbuttonHrefLabel: string;
  children: React.ReactNode;
}

const FormWrapper = ({
  children,
  backbuttonHref,
  backbuttonHrefLabel,
  backbuttonLabel,
  headerLabel,
}: FormWrapperProps) => {
  return (
    <div className="rounded-xl sm:border-2 border-zinc-200 p-6 sm:p-8 space-y-2 flex flex-col items-center justify-center">
      <div className="text-center p-2 space-y-4 w-full my-4">
        <Logo logoclassName="text-3xl" iconclassName="h-8 w-8" />
        <p className="text-slate-800 text-2xl font-semibold text-center">
          {headerLabel}
        </p>
      </div>
      <Socials />
      <div className="flex flex-col justify-center items-center p-2 mx-20 w-full">
        {children}
      </div>
      <p className="text-sm text-gray-500 text-center">
        {backbuttonLabel}{" "}
        <Link href={backbuttonHref} className="underline">
          {backbuttonHrefLabel}
        </Link>
      </p>
    </div>
  );
};

export default FormWrapper;
