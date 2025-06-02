import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const signup = async (req,res) => {
        try {
            const {name, email, password} = req.body

            if(!name || !email || !password) return res.status(400).json({message:"All feild is required"})

                if(password.length < 6) return res.status(400).json({message:"Password Must be atleast 6 characters long"})

             const existedUser = await userModel.findOne({email})

             if(existedUser) return res.status(400).json({message:"Email is already registered"})
                
                const hashedPassword = await bcrypt.hash(password, 10)

            const user = await userModel.create({
                name,
                email,
                password:hashedPassword
            })

            console.log(user)

            res.status(200).json(user)


        } catch (error) {
                console.log(error)
                res.status(500).json({message:"Internal server error"})
        }
}