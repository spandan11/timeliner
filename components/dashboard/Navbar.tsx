import Logo from "@/components/logo";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 border-b-2 ">
      <Logo />
      <UserProfile />
    </div>
  );
};

export default Navbar;
