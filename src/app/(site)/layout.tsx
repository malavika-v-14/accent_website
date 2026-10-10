import { InquiryProvider } from "@/components/Inquiry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTracker from "@/components/PageTracker";
import CookieConsent from "@/components/CookieConsent";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <InquiryProvider><PageTracker /><Navbar /><Motion /><main id="main-content" className="flex-1">{children}</main><Footer /><WhatsAppButton /><CookieConsent /></InquiryProvider>;
}
