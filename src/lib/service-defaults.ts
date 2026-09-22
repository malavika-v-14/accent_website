export const college = [
  {title: "Technical Workshops", tag: "LEARN BY DOING", icon: "⌘", text: "Get hands-on with technology. Explore tools, practise new techniques and turn classroom concepts into working projects.", details: ["Practical, guided exercises", "Topics aligned with your students’ interests", "Space to build, ask and experiment"]},
  {title: "Technical Talks", tag: "FRESH PERSPECTIVES", icon: "↗", text: "Bring industry perspectives to campus through focused conversations on technology, emerging ideas and career possibilities.", details: ["Focused sessions on relevant topics", "Industry perspectives and career insights", "Interactive questions and discussion"]},
  {title: "Certification Programs", tag: "BUILD YOUR CREDENTIALS", icon: "✳", text: "Give learning a clear direction with structured programs that help students develop and demonstrate their skills.", details: ["A structured learning pathway", "Practice and assessment opportunities", "Certification scope agreed for each program"]},
  {title: "Industrial Visits", tag: "BEYOND THE CLASSROOM", icon: "↗", text: "Connect theory with the working world. Discover professional environments and see how teams put their knowledge into practice.", details: ["Exposure to workplace environments", "Connections between theory and practice", "Visit plans coordinated with the institution"]},
  {title: "MoUs", tag: "GROW TOGETHER", icon: "∞", text: "Build a lasting connection between your institution and Accent through an ongoing learning and development partnership.", details: ["An institutional partnership framework", "Programs planned around campus needs", "A shared approach to ongoing learning"]},
];
export const employee = [
  {title: "Employee Engagement Programs", tag: "STRONGER CONNECTIONS", icon: "∞", text: "Create opportunities for colleagues to connect, collaborate and participate through purposeful team experiences.", details: ["Collaborative team activities", "Experiences shaped around your people", "A focus on participation and connection"]},
  {title: "Soft Skills Training", tag: "PEOPLE-FIRST GROWTH", icon: "↗", text: "Help your people communicate clearly, collaborate confidently and navigate everyday workplace situations.", details: ["Communication and presentation practice", "Collaboration and leadership topics", "Workplace scenarios and discussion"]},
  {title: "Technical Workshops", tag: "PRACTICAL EXPERTISE", icon: "⌘", text: "Bring focused, hands-on learning to your team with workshops shaped around relevant tools and technical challenges.", details: ["Practical technical exercises", "Topics scoped to your team’s needs", "A guided environment to experiment"]},
  {title: "Employee Upskilling Programs", tag: "READY FOR WHAT’S NEXT", icon: "↗", text: "Support your team’s next stage of growth with a structured learning journey that builds on the skills they already have.", details: ["Learning goals defined with your team", "A progressive program structure", "Opportunities to practise new skills"]},
  {title: "Certification Programs", tag: "RECOGNISE PROGRESS", icon: "✳", text: "Support professional development through focused certification programs aligned with your team’s learning priorities.", details: ["Role-relevant learning pathways", "Structured practice and assessment", "Certification scope agreed before delivery"]},
];
export type ServiceEntry = (typeof college)[number];
export type ServiceCatalogData = { colleges: ServiceEntry[]; companies: ServiceEntry[] };
export const defaultCatalog: ServiceCatalogData = { colleges: college, companies: employee };
export const serviceKeys = ["colleges", "companies"].flatMap(audience =>
  defaultCatalog[audience as keyof ServiceCatalogData].map((service, index) => ({ id: `${audience}-${index}`, audience, ...service }))
);
