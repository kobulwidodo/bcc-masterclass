import { Router } from 'express';
import { login, register, logout, view, addbalance, edit, deleteuser, adminEdit } from '../controllers/authController.js'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

router.post('/addbalance', requireAuth, addbalance);

router.get('/', requireAuth, view); //the endpoint gonna be localhost/user/
router.patch('/', requireAuth, edit);

router.delete('/deleteuser', requireAuth, requireRole(2), deleteuser);
router.patch('/editadmin', requireAuth, requireRole(2), adminEdit);

export default router;
