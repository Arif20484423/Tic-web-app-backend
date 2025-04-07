import mongoose, {Schema} from "mongoose"

const forgotTokenSchema = Schema({
    rollNumber:{
        type:String,
        required:true,
        unique:true,
    },
    token:{
        type:String,
        required:true
    }
},{timestamps:true})
export default mongoose.model("ForgotToken",forgotTokenSchema)