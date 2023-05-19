import { FastifyInstance } from "fastify";
import z from "zod";

import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
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

	app.get("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id: id,
			},
		});

		return memory;
	});

	app.post("/memories", async (request) => {
		const bodySchema = z.object({
			description: z.string(),
			image: z.string(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { description, image, isPublic } = bodySchema.parse(
			request.body
		);

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

	app.put("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const bodySchema = z.object({
			description: z.string(),
			image: z.string(),
			isPublic: z.coerce.boolean().default(false),
		});

		const { description, image, isPublic } = bodySchema.parse(
			request.body
		);

		const memory = await prisma.memory.update({
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

	app.delete("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		await prisma.memory.delete({
			where: {
				id: id,
			},
		});
	});
}
