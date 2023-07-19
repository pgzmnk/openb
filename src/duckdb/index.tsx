import { Project } from "@/interfaces";
import duckdb from "duckdb";

function duckdbConnection() {
  // Connect to DuckDB
  var db = new duckdb.Database(
    `md:?motherduck_token=${process.env.NEXT_PUBLIC_MOTHERDUCK_TOKEN}`,
  );
  var con = db.connect();
  con.run("USE climatebase;");
  return con;
}

export function createProject(project: Project) {
  const con = duckdbConnection();

  con.all(
    `INSERT INTO project(id, name, description, geometry, published, authorId) 
        VALUES ('${project.id}', '${project.name}', '${project.description}', '${project.geometry}', ${project.published}, '${project.authorId}');
            `,
    function (err, response) {
      if (err) {
        throw err;
      }
    },
  );
}

export function getProject(id: string): Promise<Project | null> {
  const con = duckdbConnection();
  return new Promise((resolve, reject) => {
    con.all(`FROM project WHERE id = '${id}'`, function (err, response) {
      if (err) {
        reject(err);
      }
      if (response.length === 0) {
        resolve(null);
      } else {
        resolve(response[0] as Project);
      }
    });
  });
}

export function listProjects(author: string): Promise<Project[] | null> {
  const con = duckdbConnection();
  return new Promise((resolve, reject) => {
    con.all(`FROM project WHERE authorId = '${author}'`, function (err, response) {
      if (err) {
        reject(err);
      }
      if (response.length === 0) {
        resolve(null);
      } else {
        resolve(response as Project[]);
      }
    });
  });
}
