
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from 'knex';
import { z } from 'zod';
import * as fs from 'node:fs'
import { randomUUID } from "node:crypto";

interface Todo{
    id: string,
    name: string,
    description: string,
    finished: boolean,
}
const todos: Array<Todo> = [ ];

export async function TODORoutes(app: FastifyInstance){
    app.get('/', (request: FastifyRequest, reply: FastifyReply)=>{
        return todos
    })

    app.get('/:id', (request: FastifyRequest, reply: FastifyReply) => {
       const { id } = request.params
        todos.forEach(todo => {
            const found_it = id == todo.id

            if (found_it){

            reply.send(todo) 
            }

        });
    // Run thought the todos list and find the specific ID that i am looking for
    })

    app.post('/', (request:FastifyRequest, reply: FastifyReply) =>{
       const { name, description } = request.body;
       const todo: Todo = {
        id: randomUUID(),
        name,
        description,
        finished: false
    }
        todos.push(todo);
        reply.status(201).send('TODO Created!')
    })

    // GET SPECIF TODO

    // CREATE A TODO

    // DELETE A TODO

    // UPDATE A TODO
}
