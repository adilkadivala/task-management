import { SocialAuthHandler } from "./components/social-auth-handler";
import Paths from "./routes";

export default function Home() {
  return (
    <>
      <SocialAuthHandler />
      <Paths />
    </>
  );
}
