import fastify from "fastify";
import { memoriesRoutes } from "./routes/memories";

//my version
import { myMemoriesRoutes } from "./routes/mymemories";

const app = fastify();

app.register(memoriesRoutes);
// app.register(myMemoriesRoutes);

app.listen({
	port: 5353,
}).then(() => {
	console.log("server running localhost:5353....");
});
