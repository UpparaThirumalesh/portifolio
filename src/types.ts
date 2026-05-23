export interface Project {
  id: number;
  title: string;
  tags: string[];
  description: string;
  githubUrl: string;
  demoUrl?: string;
  paperUrl?: string;
  type: 'chatbot' | 'vision' | 'fullstack' | 'ml';
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId?: string;
}

export interface EducationItem {
  institution: string;
  logo: string;
  degree: string;
  grade?: string;
  specialization?: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  iconType: 'star' | 'briefcase' | 'chart' | 'award' | 'code' | 'globe';
}
