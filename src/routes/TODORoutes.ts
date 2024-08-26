
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
    // RETURN ALL TODOS IN MEMORY 

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
    // Get request body params to create a Todo object, on the request body id and finished are not passed since they have a defautl value

    app.delete('/:id', (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params
        todos.forEach(todo => {
            const found_it: boolean = id === todo.id;
            if (found_it){
                const index: number = todos.indexOf(todo);
                todos.splice(index, 1);
                reply.status(202).send('Todo Gone Forever and Ever!');
            }
        })
    })
    // DELETE A TODO by given its unique ID


    app.patch('/:id', (request: FastifyRequest, reply: FastifyReply) =>{
        const { id } = request.params;
        todos.forEach(todo => {
            const found_it: boolean = id === todo.id;
            const  { name, description } = request.body
            if (found_it){
                const index:number = todos.indexOf(todo);
                const updated_todo: Todo = {
                    id: todo.id,
                    name,
                    description,
                    finished: todo.finished
                } 
                todos[index] = updated_todo
                reply.status(200).send('Todo Updated!')
            }
        })
    })
    // UPDATE A TODO
}
