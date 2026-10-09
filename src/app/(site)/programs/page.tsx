import type { Metadata } from "next";
import AudiencePage from "@/components/AudiencePage";
export const metadata: Metadata = { title: "Programs for job seekers — Accent", description: "Master classes, practical courses and career support for students, graduates and career switchers." };
export default function ProgramsPage() { return <AudiencePage audience="job-seekers" />; }
