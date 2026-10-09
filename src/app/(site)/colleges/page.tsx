import type { Metadata } from "next"; import AudiencePage from "@/components/AudiencePage";
export const metadata: Metadata = { title: "For colleges — Accent", description: "Hands-on learning and industry exposure for college students." };
export default function CollegesPage() { return <AudiencePage audience="colleges" />; }
