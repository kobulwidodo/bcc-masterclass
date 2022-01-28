import { Router } from 'express';
import { login, register, logout, view, addbalance } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/addbalance', requireAuth, addbalance);
router.get('/', requireAuth, view); //the endpoint gonna be localhost/user/

export default router;