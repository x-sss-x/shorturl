import PersonalInfo from "./PersonalInfo";
import SocialLinksForm from "./SocialLinkForm";
import Background from "./Background/BackgroundForm";
import AdditionalLinkForm from "./AdditionalLinkForm";
import Publish from "./ActionButtons/PublishBtn";
import DemoBtn from "./ActionButtons/DemoBtn";
import Link from "next/link";
import { ShoppingCart, Link2, Github, Coffee } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Navbar from "./Navbar";
import { auth } from "./auth";
import MobileMockup from "./mockup/MobileMockup";
const HomeEditor = async () => {
  const session = await auth();
  return (
    <>
      <div className="h-screen min-h-screen  w-full overflow-y-auto gap-4 flex flex-col bg-gray-100 py-1 px-1 sm:py-8 sm:px-16">
        <Navbar />
        <PersonalInfo />
        <SocialLinksForm />
        <AdditionalLinkForm />
        <Background />
        <div className="flex gap-2 justify-center items-center w-full mb-20">
          <Publish loggedIn={session?.user || null} />
          <DemoBtn />
        </div>
      </div>
      <div className="h-auto w-[35%]   hidden bg-gray-100 lg:flex items-center justify-center">
        {/* MOBILE MOCKUP  */}
        <MobileMockup />
      </div>
    </>
  );
};
export default HomeEditor;
