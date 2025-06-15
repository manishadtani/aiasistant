import userModel from "../models/user.model.js"
                                                           
export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        console.log(userId)
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await userModel.findById(userId).select('-password')
        console.log(user)
        if(!user) return res.status(400).json({message:'user not found'})
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'get current user error'})
    }
}