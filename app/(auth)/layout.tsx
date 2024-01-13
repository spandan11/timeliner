import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  const session = await getServerAuthSession();
  if (session?.user || session?.user.id) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
