import "dotenv/config";

import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { memoriesRoutes } from "./routes/memories";

//my version
import { myMemoriesRoutes } from "./routes/myMemories";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.register(memoriesRoutes);
app.register(fastifyJwt, {
	secret: "timecapsule",
});
app.register(fastifyCors, {
	// origin: true, //libera pra geral acessar
	origin: ["http://localhost:3000"],
});
// app.register(myMemoriesRoutes);

app.listen({
	port: 5353,
}).then(() => {
	console.log("server running localhost:5353....");
});
