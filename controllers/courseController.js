import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import Course from '../models/Course.js';

export async function viewAllCourse(req, res) {
	
	const course = await Course.find();
	return res.json({
		message: "Available Course",
		course: course
	});
};

export async function viewUserCourse(req, res) {

	const user = await User.findOne({"_id": res.locals.user}).populate('course');
	return res.json({
		message: "Your Course",
		course: user.course
	});
};

export async function addCourse(req, res){
	const { courseName, courseDescription, coursePrice } = req.body;
	try {
		const course = await Course.create({courseName, courseDescription, coursePrice});
		res.status(201).json({"Message": "Course Created", course});
	} catch (error) {
		console.log(error);
		res.status(404).json({"Error": "Course not created", error});
	}
};

export async function buyCourse(req, res){
	const { courseSlug } = req.body;
	try {
		const course = await Course.findOne({ "courseSlug": courseSlug});
		const user = await User.findOne({"_id": res.locals.user});
		user.course.push(course);
		if(user.balance - course.coursePrice >= 0){
			user.balance -= course.coursePrice;
			user.save();
			res.status(201).json({"Message": "Course Purchased", course});
		} else {
			res.status(402).json({"Error": "Insufficient Balance"});
		}
	} catch (error) {
		console.log(error);
	}
}
