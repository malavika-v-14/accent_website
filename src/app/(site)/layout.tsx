import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <><Navbar /><Motion /><main id="main-content" className="flex-1">{children}</main><Footer /></>;
}
