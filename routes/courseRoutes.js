import { Router } from 'express';
import { viewUserCourse, addCourse, buyCourse, viewAllCourse, viewCourse, editCourse, deleteCourse } from '../controllers/courseController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();


//user
router.get('/', viewAllCourse)
router.get('/my', requireAuth, viewUserCourse) //must implement middleware to check for jwt
router.post('/buycourse', requireAuth, buyCourse);

//instructor only
router.post('/addcourse', requireAuth, requireRole(1), addCourse);
router.get('/:slug', viewCourse);
router.patch('/:slug', requireAuth, requireRole(1), editCourse);
router.delete('/:slug', requireAuth, requireRole(1), deleteCourse);


export default router;
