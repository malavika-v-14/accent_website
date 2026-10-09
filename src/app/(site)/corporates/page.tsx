import type { Metadata } from "next"; import AudiencePage from "@/components/AudiencePage";
export const metadata: Metadata = { title: "For corporates — Accent", description: "Capability-building programs for teams." };
export default function CorporatesPage() { return <AudiencePage audience="corporates" />; }
