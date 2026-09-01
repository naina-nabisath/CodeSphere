import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }, 
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

studentSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error) {
        error: error.message
    }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;