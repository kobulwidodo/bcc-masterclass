import { Router } from 'express';
import { viewUserCourse, addCourse, buyCourse, viewAllCourse } from '../controllers/courseController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', viewAllCourse) //must implement middleware to check for jwt
router.get('/my', requireAuth, viewUserCourse) //must implement middleware to check for jwt

router.post('/addcourse', requireAuth, addCourse);
router.post('/buycourse', requireAuth, buyCourse);

export default router;