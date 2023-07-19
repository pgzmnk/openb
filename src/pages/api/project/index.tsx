import { NextApiRequest, NextApiResponse } from 'next';
import { Project, ApiMessageResponse } from '@/interfaces';
import duckdb from "duckdb";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiMessageResponse>
) {

    const { query, method } = req
    const { id, name, description, geometry, published, authorId } = req.body;

    // Connect to DuckDB
    var db = new duckdb.Database(
        `md:?motherduck_token=${process.env.NEXT_PUBLIC_MOTHERDUCK_TOKEN}`,
    );
    var con = db.connect();
    con.run("USE climatebase;");

    switch (method) {
        case 'GET':
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
        case 'POST':
            // Create data in your database
            con.all(
                `INSERT INTO project(id, name, description, geometry, published, authorId) 
                VALUES ('${id}', '${name}', '${description}', '${geometry}', ${published}, '${authorId}');
                    `,
                function (err, response) {
                    if (err) {
                        throw err;
                    }
                }
            )
            res.status(200).send({ message: "Success." });
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}