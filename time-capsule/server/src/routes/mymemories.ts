import { FastifyInstance, FastifyRequest } from "fastify";

import { prisma } from "../lib/prisma";

interface IGetByIdParams {
	id: string;
}

export async function myMemoriesRoutes(app: FastifyInstance) {
	app.get("/memories", async () => {
		const memories = await prisma.memory.findMany({
			orderBy: {
				createdAt: "asc",
			},
		});
		return memories.map((memory) => {
			return {
				id: memory.id,
				coverUrl: memory.image,
				excerpt: memory.description.substring(0, 120).concat("..."),
			};
		});
	});

	app.get(
		"/memories/:id",
		async (request: FastifyRequest<{ Params: IGetByIdParams }>) => {
			const { id } = request.params;
			let memory;

			if (id && typeof id === "string") {
				memory = await prisma.memory.findUniqueOrThrow({
					where: {
						id: id,
					},
				});
			}

			return memory;
		}
	);

	app.post("/memories", async (request) => {
    const {body} = request.body;
  });

	app.put("/memories/:id", async () => {});

	app.delete("/memories/:id", async () => {});
}
