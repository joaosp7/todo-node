import fastify from "fastify";

const app = fastify()

app.get('/hello', ()=>{
    return'Wellcome to my first TODO!';
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!');
})