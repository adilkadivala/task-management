import { Router } from "express";
import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";
import GitHub from "@auth/express/providers/github";
import { socialLoginController } from "../controller/social-auth";

const socialAuthRouter = Router();
socialAuthRouter.use(
  "/",
  ExpressAuth({
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        await socialLoginController({ user, account });
        return true;
      },

      async session({ session, token }) {
        session.user = {
          ...session.user,
          id: token.sub!,
        };
        return session;
      },

      async redirect() {
        return process.env.CLIENT_URL || "http://localhost:5173";
      },
    },

    secret: process.env.AUTH_SECRET!,
    trustHost: true,
  })
);

export default socialAuthRouter;
