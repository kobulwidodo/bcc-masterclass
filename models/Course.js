import mongoose from "mongoose";
import slugify from "slugify";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseSlug: {
        type: String,
        immutable: true,
        unique: true
    },
    courseDescription: {
        type: String,
    },
    coursePrice: {
        type: Number,
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
})

const course = mongoose.model("course", courseSchema);

export default course;