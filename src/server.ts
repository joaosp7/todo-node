import fastify from "fastify";
import { TODORoutes } from "./routes/TODORoutes";

const app = fastify()

app.register(TODORoutes, {
    prefix: 'todo'
})

await app.listen({
    port: 3333,
})
console.log('App Server Running! ')