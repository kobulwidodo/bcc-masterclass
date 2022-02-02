import { Router } from 'express';
import { viewUserCourse, addCourse, buyCourse, viewAllCourse, viewCourse, editCourse, deleteCourse, adminDeleteCourse } from '../controllers/courseController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

//all
router.get('/', viewAllCourse) //see all courses
router.get('/:slug', viewCourse); //See Course Details

//user
router.get('/library/my', requireAuth, viewUserCourse) //see user owned courses
router.post('/:slug/enroll', requireAuth, buyCourse); //buy course

//instructor only
router.post('/addcourse', requireAuth, requireRole(1), addCourse);
router.patch('/:slug', requireAuth, requireRole(1), editCourse);
router.delete('/:slug', requireAuth, requireRole(1), deleteCourse);

//admin
router.delete('/admindelete/:slug', requireAuth, requireRole(2), adminDeleteCourse);

export default router;
