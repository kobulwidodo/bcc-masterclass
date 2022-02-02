import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, "Please enter a course name"],
    },
    courseSlug: {
        type: String,
        immutable: true,
        unique: [true, "Course slug already exists"],
    },
    courseDescription: {
        type: String,
        required: [true, "Please enter a course description"],
    },
    coursePrice: {
        type: Number,
        required: [true, "Please enter a course price"],
    },
    courseAuthor: {
        type:Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

courseSchema.pre("save", function(next){
    this.courseSlug = slugify(this.courseName, {
        lower: true,
    });
    next();
});
    
const course = mongoose.model("course", courseSchema);

export default course;
