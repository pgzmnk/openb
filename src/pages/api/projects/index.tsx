import { NextApiRequest, NextApiResponse } from "next";
import { Project, ApiMessageResponse } from "@/interfaces";
import { listProjects } from "@/duckdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | null | ApiMessageResponse>,
) {
  const { method } = req;
  // const project: Project[] = { ...req.body };
  const author = "default";

  switch (method) {
    case "GET":
      const projects = await listProjects(author);
      res.status(200).json(projects);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
