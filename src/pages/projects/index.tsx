import { Project } from "@/interfaces";
import ProjectCard from "@/components/ProjectCard";
import useSwr from "swr";
import { useSession } from "next-auth/react";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

export default function ProjectsPage() {
  // const { data: session } = useSession();
  // const author = session?.user?.email || "default"
  // console.log('- author', author)

  const { data, error, isLoading } = useSwr<Project[]>(
    `/api/projects`,
    fetcher,
  );

  if (error) return <div>Failed to load project.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No project found.</div>;

  return (
    <div className="container mx-auto p-10">
      <h1>My Projects</h1>
      {data.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
