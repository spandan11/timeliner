import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/dashboard/Navbar";
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerAuthSession();
  if (!session?.user || !session?.user.id) {
    redirect("/login");
  }
  return (
    <MaxWidthWrapper
      className={cn(
        `flex flex-col items-center justify-center gap-8 w-full`,
        poppins.className
      )}
    >
      <Navbar />
      <div className="p-2 w-full">{children}</div>
    </MaxWidthWrapper>
  );
};

export default DashboardLayout;
