import { NextApiRequest, NextApiResponse } from "next";
import { Project, ApiMessageResponse } from "@/interfaces";
import { listProjects } from "@/duckdb";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | null | ApiMessageResponse>,
) {
  const session = await getSession({ req });
  const { method } = req;
  const author = session?.user?.email || "default";

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
