import CreateProjectForm from "@/components/CreateProjectForm";
import { Project } from "@/interfaces";
import Router from "next/router";

export default function Project() {
  async function handleSubmit(project: Project) {
    try {
      await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      await Router.push(`/project/${project.id}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <CreateProjectForm onSubmit={handleSubmit} />
    </div>
  );
}
