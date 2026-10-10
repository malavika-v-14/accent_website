import Image from "next/image";
import OfferingGrid from "./OfferingGrid";
import ResourceGrid from "./ResourceGrid";
import { InquiryButton, type FormKind } from "./Inquiry";
import CourseDetails from "./CourseDetails";
import { FAQ } from "./BriefSections";
import type { Audience } from "@/lib/offerings";
const content = {
 "job-seekers": { eyebrow:"FOR JOB SEEKERS", title:"Build skills for the work ahead.", text:"For students, graduates and career switchers looking for a practical next step.", cta:"Reserve your seat", image:"collaborate", kind:"master" as FormKind },
 colleges:{ eyebrow:"FOR COLLEGES", title:"Amplify what your campus already does well.", text:"Hands-on learning, industry perspective and meaningful exposure for your students.", cta:"Request a campus conversation", image:"campus", kind:"college" as FormKind },
 corporates:{ eyebrow:"FOR CORPORATES", title:"Build capability that stays with your team.", text:"Learning experiences shaped around the work your people do every day.", cta:"Book a free needs call", image:"team", kind:"corporate" as FormKind }
};
export default function AudiencePage({ audience }: { audience: Audience }) {
 const c=content[audience];
 return <div className="audience-experience">
 <section className="page-hero wrap page-hero-grid">
 <div className="page-hero-copy"><p className="section-kicker"><span/>{c.eyebrow}</p><h1>{c.title}</h1><p>{c.text}</p><div id="main-action" className="mt-7"><InquiryButton kind={c.kind} audience={audience}>{c.cta}</InquiryButton></div></div>
 <div className="page-hero-photo"><Image src={`/images/${c.image}.jpg`} alt={audience==="colleges"?"Students learning together":audience==="corporates"?"Colleagues collaborating":"Learners building practical skills"} fill priority sizes="(max-width:767px) 90vw, 45vw" className="object-cover"/></div>
 </section>
 <section className="wrap brief-entry"><p className="section-kicker">START HERE</p><div className="brief-entry-links">
 {audience==="job-seekers"&&<><InquiryButton kind="master" className="action-text">Free master class</InquiryButton><InquiryButton kind="guidance" className="action-text">Book free session</InquiryButton><InquiryButton kind="updates" className="action-text">Get updates</InquiryButton></>}
 {audience==="colleges"&&<InquiryButton kind="college" offering="Free campus technical talk" className="action-text">Request a free campus technical talk</InquiryButton>}
 <a href="#resources" className="action-text">Free downloads ↓</a></div></section>
 <OfferingGrid audience={audience}/>
 {audience==="job-seekers"&&<CourseDetails/>}
 <section className="resources-section wrap" id="resources"><div className="section-heading"><div><p className="section-kicker"><span/> FREE RESOURCES</p><h2>Free downloads</h2></div><p>{audience==="corporates"?"Access with your official company email.":"Practical guides and templates for your next step."}</p></div><ResourceGrid audience={audience}/></section>
 <FAQ/>
 <section className="closing-section wrap"><div className="home-closing"><div><p className="section-kicker">YOUR NEXT STEP</p><h2>{c.cta}</h2></div><InquiryButton kind={c.kind} audience={audience}>{c.cta}</InquiryButton></div></section>
 </div>;
}
