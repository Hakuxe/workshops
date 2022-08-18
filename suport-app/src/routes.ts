import { Router } from "express";

// middleware
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListSendComplimentsController } from "./controllers/ListSendComplimentsController";
import { ListReceiveComplimentsController } from "./controllers/ListReceiveComplimentsController";

export const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listReceiveComplimentsController = new ListReceiveComplimentsController();
const listSendComplimentsController = new ListSendComplimentsController();

// user
router.post("/users", createUserController.handle);
router.get(
	"/send-compliments",
	ensureAuthenticated,
	listSendComplimentsController.handle
);
router.get(
	"/receive-compliments",
	ensureAuthenticated,
	listReceiveComplimentsController.handle
);

router.post("/login", authenticateUserController.handle);

// tags
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
