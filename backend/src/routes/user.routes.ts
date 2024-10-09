import Validations from "../middleware/validations";
import UserController from "../controller/UserController";
import { Request, Response, Router } from "express";

const userController = new UserController();

const router = Router()


router.post('/register', Validations.validateUser, (req: Request, res: Response) => userController.register(req, res));
router.post('/login', Validations.validateLogin, (req: Request, res: Response) => userController.login(req, res)
);

router.get('/profile', Validations.validateToken, (req, res) => { res.json({ profile: true }) });

export default router;