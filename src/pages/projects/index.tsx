import { Project } from "@/interfaces";
import ProjectCard from "@/components/ProjectCard";
import { useState, useEffect } from "react";

// Function to fetch the list of projects (replace with your actual implementation)
const fetchProjects = async () => {
  // Your API call or data fetching logic here
  // For demonstration purposes, let's assume you have a list of projects already.
  const projects = [
    { id: "1", name: "Project 1", description: "Description for Project 1" },
    { id: "2", name: "Project 2", description: "Description for Project 2" },
    // Add more projects as needed...
  ];
  return projects;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects().then((data) => setProjects(data));
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h1>My Projects</h1>
      {projects.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {projects.map((project) => (
            <ProjectCard {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
