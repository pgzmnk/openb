import { NextApiRequest, NextApiResponse } from "next";
import { Project, ApiMessageResponse } from "@/interfaces";
import { getProject } from "@/duckdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | ApiMessageResponse>,
) {
  const { query, method } = req;
  const id = query.id as string;
  const name = query.name as string;

  switch (method) {
    case "GET":
      // Get data from your database
      try {
        const project = await getProject(id);

        console.log("- api project", project);

        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: "Project not found." });
        }
      } catch (error) {
        console.error(error);
      }

      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
