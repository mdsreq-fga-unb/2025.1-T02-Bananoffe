import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth/next";

export const getServerAuthSession = () => getServerSession(authOptions);
