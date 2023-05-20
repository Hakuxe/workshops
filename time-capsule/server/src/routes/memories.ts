import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
	app.addHook("preHandler", async (request) => {
		await request.jwtVerify();
	});

	app.get("/memories", async (request) => {
		const memories = await prisma.memory.findMany({
			where: {
				userId: request.user.sub,
			},
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

	app.get("/memories/:id", async (request, response) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		if (!memory.isPublic && memory.userId !== request.user.sub) {
			return response.status(401).send();
		}

		return memory;
	});

	app.post("/memories", async (request) => {
		const bodySchema = z.object({
			description: z.string(),
			image: z.string(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { description, image, isPublic } = bodySchema.parse(request.body);

		const newMemory = await prisma.memory.create({
			data: {
				description,
				image: image,
				isPublic,
				userId: "e1468cd2-c8e7-4116-847a-7d906f193216",
			},
		});

		return newMemory;
	});

	app.put("/memories/:id", async (request, response) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const bodySchema = z.object({
			description: z.string(),
			image: z.string(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { description, image, isPublic } = bodySchema.parse(request.body);

		let memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		});

		if (memory.userId !== request.user.sub) {
			return response.status(401).send();
		}

		memory = await prisma.memory.update({
			where: {
				id: id,
			},
			data: {
				description,
				image: image,
				isPublic,
			},
		});

		return memory;
	});

	app.delete("/memories/:id", async (request, response) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);
		
		let memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id,
			},
		});

		if (memory.userId !== request.user.sub) {
			return response.status(401).send();
		}

		await prisma.memory.delete({
			where: {
				id: id,
			},
		});
	});
}
