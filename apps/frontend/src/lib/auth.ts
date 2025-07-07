import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const getServerAuthSession = () => getServerSession(authOptions);
