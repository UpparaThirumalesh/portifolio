import { Project, Certification, EducationItem, AchievementItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "1. TalentScan AI – Intelligent Resume Analysis & Hiring Assistant",
    tags: ["React", "Node.js", "Express.js", "JavaScript", "LLM API"],
    description: "Developed a full-stack web application to analyze resumes against job descriptions and generate match scores. Built and integrated RESTful APIs using Node.js and Express for scalable resume processing. Integrated LLM API to perform skill gap analysis and generate interview questions dynamically. Implemented efficient request handling to support multiple concurrent users.",
    githubUrl: "https://github.com/UpparaThirumalesh/TalentScan-AI-Intelligent-Resume-Analysis-Hiring-Assistant",
    type: "chatbot"
  },
  {
    id: 2,
    title: "2. Collaborative Expense Management System",
    tags: ["Python", "Flask", "SQL", "React", "JavaScript"],
    description: "Built a full-stack web application supporting 50+ users for managing shared expenses. Developed REST APIs using Flask and implemented optimized expense-splitting algorithms. Reduced calculation errors by ensuring accurate real-time balance tracking.",
    githubUrl: "https://github.com/UpparaThirumalesh/expense-sharing-app",
    type: "fullstack"
  },
  {
    id: 3,
    title: "3. AI-Powered Query Resolution System",
    tags: ["Python", "SQL", "NLP (NLTK, spaCy)", "REST APIs"],
    description: "Developed an NLP-based system for automated query handling, improving response accuracy by 30%. Implemented intent classification to process 100+ user queries efficiently. Designed backend services using Python and SQL for real-time query processing and analytics.",
    githubUrl: "https://github.com/UpparaThirumalesh/college--chatbot",
    type: "chatbot"
  },
  {
    id: 4,
    title: "4. Kooli App (Internship Project)",
    tags: ["Firebase", "Google Maps API", "MySQL", "NoSQL", "Python", "Flask", "React", "Android"],
    description: "Played a key role in designing and developing both frontend and backend modules of the Kooli App during the internship at Ram (India) Smart Digital AI Solutions Pvt. Ltd. Developed location-based service discovery by implementing frontend UI and backend data handling using Firebase. Designed filtering and distance-based logic to display nearby services. Integrated Google Maps API and Firebase Realtime Database for scalable data storage.",
    githubUrl: "https://github.com/UpparaThirumalesh/Androidapp_Appilication",
    type: "fullstack"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: "Data Science for Engineers – NPTEL",
    issuer: "NPTEL & IIT Madras",
    date: "2024",
    skills: ["Data Science", "Python", "R Programming", "Predictive Modelling"],
    credentialId: "NPTEL-DS-81920"
  },
  {
    id: 2,
    title: "Internet of Things – NPTEL",
    issuer: "NPTEL & IIT Kharagpur",
    date: "2024",
    skills: ["Internet of Things", "Sensors", "Networking", "Microcontrollers"],
    credentialId: "NPTEL-IOT-99231"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "National Institute of Technology, Tadepalligudem",
    degree: "B.Tech in Electrical and Electronics Engineering",
    specialization: "Duration: Nov 2022 - May 2026",
    grade: "CGPA: 7.95",
    logo: "NIT AP"
  },
  {
    institution: "Narayana Junior College",
    degree: "Senior Secondary Education",
    specialization: "Duration: Jun 2020 - Apr 2022",
    grade: "Percentage: 98.3",
    logo: "Narayana"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Full Stack Developer Intern",
    description: "Designed core REST APIs, Google Maps integrations, and Firebase layers for Kooli App at Ram (India) Smart Digital AI Solutions Pvt. Ltd.",
    iconType: "briefcase"
  },
  {
    title: "350+ Problems Solved",
    description: "Solved 350+ problems on LeetCode; achieved 50-day and 100-day streak badges.",
    iconType: "code"
  },
  {
    title: "CGPA Merit Standout",
    description: "Maintained a strong 7.95 Cumulative CGPA in Electrical and Electronics Engineering at NIT Andhra Pradesh.",
    iconType: "star"
  },
  {
    title: "Senior Secondary Perfection",
    description: "Earned an outstanding 98.3% grade in Narayana Junior College state board exams.",
    iconType: "award"
  },
  {
    title: "Languages Proficiency",
    description: "Fluent in English, Telugu, and Hindi.",
    iconType: "globe"
  }
];

export const EXPERTISE_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: "code",
    skills: ["Python", "Java", "C", "SQL"]
  },
  {
    title: "Frontend Development",
    icon: "layers",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js"]
  },
  {
    title: "Backend Development",
    icon: "database",
    skills: ["Node.js", "Express.js", "Flask", "REST APIs"]
  },
  {
    title: "Databases",
    icon: "database",
    skills: ["MySQL", "PostgreSQL", "MongoDB"]
  },
  {
    title: "Tools & Platforms",
    icon: "tool",
    skills: ["Git", "GitHub", "Postman", "Firebase", "Google Cloud"]
  },
  {
    title: "Core CS",
    icon: "star",
    skills: ["Data Structures & Algorithms (DSA)", "OOP", "DBMS", "Operating Systems"]
  },
  {
    title: "Additional Skills",
    icon: "globe",
    skills: ["Basic Machine Learning", "NLP", "LLM Integration", "Problem Solving", "Analytical Thinking"]
  }
];
