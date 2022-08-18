import { Router } from "express";

// middleware
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ListTagController } from "./controllers/ListTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListSendComplimentsController } from "./controllers/ListSendComplimentsController";
import { ListReceiveComplimentsController } from "./controllers/ListReceiveComplimentsController";

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listReceiveComplimentsController = new ListReceiveComplimentsController();
const listSendComplimentsController = new ListSendComplimentsController();

const listTagController = new ListTagController();
const createTagController = new CreateTagController();

const createComplimentController = new CreateComplimentController();

// user
router.post("/users", createUserController.handle);
router.get(
	"/user/compliments/send",
	ensureAuthenticated,
	listSendComplimentsController.handle
);
router.get(
	"/user/compliments/receive",
	ensureAuthenticated,
	listReceiveComplimentsController.handle
);

router.post("/login", authenticateUserController.handle);

// tags
router.get("/tags", ensureAuthenticated, listTagController.handle)
router.post(
	"/tags",
	ensureAuthenticated,
	ensureAdmin,
	createTagController.handle
);

// compliments
router.post(
	"/compliments",
	ensureAuthenticated,
	createComplimentController.handle
);
