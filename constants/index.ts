import env from "@/configs/env";

export const API_URLS = {
  REGISTER: `${env.NEXTAUTH_URL}/api/auth/register`,
  LOGIN: `${env.NEXTAUTH_URL}/api/auth/login`,
};

export const PUBLIC_ROUTES = ["/"];
export const AUTH_ROUTES = ["/login", "/register", "verify-email"];
