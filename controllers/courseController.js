import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import Course from '../models/Course.js';

export async function viewAllCourse(req, res) {
	
	const course = await Course.find().populate('courseAuthor', 'fullName');
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
		const courseAuthor = res.locals.user;
		const course = await Course.create({courseName, courseDescription, coursePrice, courseAuthor});
		res.status(201).json({"Message": "Course Created", course});
	} catch (error) {
		res.status(409).json({"Message": "Course not created", "error": error.message});
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
		return res.status(404).json({"Message": "Course not found"});
	}
}

export async function viewCourse(req, res){
	const courseSlug = req.params.slug;
	try {
		const course = await Course.findOne({ "courseSlug": courseSlug});
		return res.status(201).json({
			message: "Course Details",
			course: course
		});
	} catch(e){
		return res.status(403).json({
			message: "Error in fetching course",
			error: e.message
		})
	}
}

export async function editCourse(req, res){
	const courseSlug = req.params.slug;

	try {
		const course = await Course.findOne({ "courseSlug": courseSlug});
		if (req.body.courseName) {
			course.courseName = req.body.courseName;
			await course.save();
		};
		if (req.body.courseDescription){
			course.courseDescription = req.body.courseDescription;
			await course.save();
		}
		if (req.body.coursePrice){
			course.coursePrice = req.body.coursePrice;
			await course.save();
		}
		return res.status(200).json({
			message: "Course Updated",
			course: course
		});
	} catch (error) {
		return res.status(404).json({"Message": "Course not found"});
	}

}

export async function deleteCourse(req, res){
	const courseSlug = req.params.slug;
	try {
		const course = await Course.findOne({ "courseSlug": courseSlug});
		await course.remove();
		return res.status(200).json({
			message: "Course Deleted",
			course: course
		});
	} catch(e){
		return res.status(403).json({
			message: "Error in deleting course",
			error: e.message
		})
	}
}
