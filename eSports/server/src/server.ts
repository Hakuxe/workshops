import express, { application, response } from "express";

const app = express();

// middleware
app.use(express.json());

app.listen(3333, () => console.log("server running...."));

// criar anúncio
app.post("/ads", (request, response) => {
	return response.status(201).json([]);
});

// listar games
app.get("/games", (request, response) => {
	return response.json([]);
});

//  listar anúncios de um game
app.get("/games/:id/ads", (request, response) => {
   // const gameId = request.params.id;

	return response.json([
		{ id: 1, name: "csgo" },
		{ id: 2, name: "fortnite" },
		{ id: 3, name: "valorant" },
	]);
});

//buscar discord por id do anúncio
app.get("/games/:id/discord", (request, response)=>{
   return response.json([
		{ id: 1, name: "csgo" },
		{ id: 2, name: "fortnite" },
		{ id: 3, name: "valorant" },
	]);

})
