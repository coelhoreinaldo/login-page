import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => { res.json({ register: true }) });
router.post('/login', (req, res) => { res.json({ login: true }) }
);
router.get('/profile', (req, res) => { res.json({ profile: true }) });

export default router;