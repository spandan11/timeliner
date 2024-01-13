import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    console.log("Path", path);
    console.log("Token", token);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
