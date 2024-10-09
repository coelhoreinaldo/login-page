import UserController from "../controller/UserController";
import { Request, Response, Router } from "express";

const userController = new UserController();

const router = Router()

router.post('/login', (req: Request, res: Response) => userController.login(req, res)
);

router.post('/register', (req, res) => { res.json({ register: true }) });
router.get('/profile', (req, res) => { res.json({ profile: true }) });

export default router;