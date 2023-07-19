import { Project } from '@/interfaces';
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

    const con = duckdbConnection()

    con.all(
        `INSERT INTO project(id, name, description, geometry, published, authorId) 
        VALUES ('${project.id}', '${project.name}', '${project.description}', '${project.geometry}', ${project.published}, '${project.authorId}');
            `,
        function (err, response) {
            if (err) {
                throw err;
            }
        }
    )

}