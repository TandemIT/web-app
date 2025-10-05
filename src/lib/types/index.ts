// TypeScript interfaces and types for the Tandem IT web app

export interface NavLink {
  href: string;
  name: string;
  id: string | null;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  html_url: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}