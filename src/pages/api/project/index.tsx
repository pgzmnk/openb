import { NextApiRequest, NextApiResponse } from "next";
import { Project, ApiMessageResponse } from "@/interfaces";
import { createProject } from "@/duckdb";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiMessageResponse>,
) {
  const { method } = req;
  const project: Project = { ...req.body };

  switch (method) {
    case "GET":
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    case "POST":
      // Create data in your database
      createProject(project);
      res.status(200).send({ message: "Success." });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
