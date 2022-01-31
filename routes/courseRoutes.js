import { Router } from 'express';
import { viewUserCourse, addCourse, buyCourse, viewAllCourse, viewCourse, editCourse, deleteCourse, adminDeleteCourse } from '../controllers/courseController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();


//user
router.get('/', viewAllCourse) //see all courses
router.get('/my', requireAuth, viewUserCourse) //see user owned courses
router.post('/buycourse', requireAuth, buyCourse); //buy course

//instructor only
router.get('/:slug', viewCourse); //See Course Details
router.post('/addcourse', requireAuth, requireRole(1), addCourse);
router.patch('/:slug', requireAuth, requireRole(1), editCourse);
router.delete('/:slug', requireAuth, requireRole(1), deleteCourse);
router.delete('/admindelete/:slug', requireAuth, requireRole(2), adminDeleteCourse);


export default router;
