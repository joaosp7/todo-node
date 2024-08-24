
import { FastifyInstance } from "fastify";
import { knex } from 'knex';
import { z } from 'zod';
import { randomUUID } from "node: crypto";

export async function TODORoutes(app: FastifyInstance){
    app.get('/', ()=>{
        return 'Wellcome to my TODO!';
    })
}
