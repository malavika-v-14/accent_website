export type Audience = "job-seekers" | "colleges" | "corporates";
export type Offering = { audience: Audience; group: string; title: string; line: string; button: string; status: "Live" | "Planned" | "Listed" };

export const offerings: Offering[] = [
  { audience: "job-seekers", group: "Engagement", title: "Master classes", line: "Learn one skill from a working practitioner in a single session.", button: "Reserve your seat", status: "Live" },
  { audience: "job-seekers", group: "Engagement", title: "Industry talks", line: "Hear from practitioners and HR leaders what the industry expects of freshers.", button: "Reserve your seat", status: "Planned" },
  { audience: "job-seekers", group: "Engagement", title: "Career guidance", line: "One-to-one guidance that matches your strengths to roles, starting with a free first session.", button: "Book free session", status: "Planned" },
  { audience: "job-seekers", group: "Engagement", title: "Psychological support sessions", line: "Support to regain focus and confidence after setbacks, from a qualified counsellor.", button: "Talk to us", status: "Planned" },
  { audience: "job-seekers", group: "Courses", title: "Corporate Finance", line: "Build entry-level corporate finance and reporting skills with AI, on practice data.", button: "Get course details", status: "Planned" },
  { audience: "job-seekers", group: "Courses", title: "Webpage Engineering with AI", line: "Build and launch a real website with a working AI feature.", button: "Get course details", status: "Planned" },
  { audience: "job-seekers", group: "Courses", title: "Digital Marketing with AI", line: "Run live campaigns and automate marketing work with AI.", button: "Get course details", status: "Planned" },
  { audience: "job-seekers", group: "Courses", title: "Crash trainings", line: "Short, fast skill programs that preview each course.", button: "Get notified", status: "Planned" },
  { audience: "job-seekers", group: "Career support", title: "Opportunity updates", line: "Get internships, programs and openings by email.", button: "Get updates", status: "Planned" },
  { audience: "job-seekers", group: "Career support", title: "Internship arrangements", line: "Find internships with partner organisations.", button: "Ask about internships", status: "Planned" },
  { audience: "job-seekers", group: "Career support", title: "Placement support", line: "Resume help, mock interviews and readiness for roles.", button: "Get placement support", status: "Planned" },
  { audience: "colleges", group: "For colleges", title: "Technical Workshops", line: "Hands-on sessions that turn classroom concepts into working projects.", button: "Plan a workshop", status: "Listed" },
  { audience: "colleges", group: "For colleges", title: "Technical Talks", line: "Bring industry perspectives to campus on technology and careers.", button: "Request a talk", status: "Listed" },
  { audience: "colleges", group: "For colleges", title: "Certification Programs", line: "Structured programs that help students build and show their skills.", button: "Explore certifications", status: "Listed" },
  { audience: "colleges", group: "For colleges", title: "Industrial Visits", line: "Connect theory with the working world through company visits.", button: "Plan a visit", status: "Listed" },
  { audience: "colleges", group: "For colleges", title: "MoUs", line: "An ongoing learning and development partnership with Accent.", button: "Discuss a partnership", status: "Listed" },
  { audience: "corporates", group: "For corporates", title: "Employee Engagement Programs", line: "Team experiences that help colleagues connect and collaborate.", button: "Plan a program", status: "Listed" },
  { audience: "corporates", group: "For corporates", title: "Soft Skills Training", line: "Communicate clearly and collaborate with confidence at work.", button: "Request training", status: "Listed" },
  { audience: "corporates", group: "For corporates", title: "Technical Workshops", line: "Hands-on workshops shaped around your team's tools and challenges.", button: "Plan a workshop", status: "Listed" },
  { audience: "corporates", group: "For corporates", title: "Employee Upskilling Programs", line: "A structured learning journey that builds on current skills.", button: "Plan upskilling", status: "Listed" },
  { audience: "corporates", group: "For corporates", title: "Certification Programs", line: "Focused certifications aligned with your team's priorities.", button: "Explore certifications", status: "Listed" },
];

export const resources = [
  ["job-seekers", "Career roadmaps", "Three one-page roadmaps for finance, web engineering and digital marketing."], ["job-seekers", "Fresher resume checklist & template", "A practical checklist and editable starter template."], ["job-seekers", "Career direction quiz", "A guided quiz with a result-note placeholder."], ["job-seekers", "AI prompts for job seekers", "Prompts for resumes, job search, interviews and learning."], ["job-seekers", "Interview preparation sheet", "Common questions and a clear answer structure."], ["job-seekers", "Master class notes", "A placeholder for post-session notes and practice tasks."],
  ["colleges", "Campus brief", "A one-page overview of how Accent works with colleges."], ["colleges", "Placement readiness self-audit", "A checklist for placement-cell conversations."], ["colleges", "Sample workshop plan", "A sample semester calendar of talks and workshops."], ["colleges", "Industrial visit planning checklist", "Planning prompts for a useful visit."],
  ["corporates", "Sample workshop outlines", "Example outlines for engagement, soft-skills and technical workshops."], ["corporates", "Team upskilling workbook", "A two-tab skills and 30-60-90 plan template."], ["corporates", "Engagement activity ideas", "Team activity formats by time and group size."], ["corporates", "Training impact tracker", "A before-and-after measurement template."],
] as const;
