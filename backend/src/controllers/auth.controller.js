import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import genToken from "../config/generateToken.js"   

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) return res.status(400).json({ message: "All feild are required" })

        if (password.length < 6) return res.status(400).json({ message: "Password Must be Atleast 6 characters long" })

        const existedUser = await userModel.findOne({ email })

        if (existedUser) return res.status(400).json({ message: "Email is already registered" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })


        const token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })
        console.log(user)
        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: "All feild are required" })

        if (password.length < 6) return res.status(400).json({ message: "Password Must be atleast 6 characters long" })

        const user = await userModel.findOne({ email })

        if (!user) return res.status(400).json({ message: "Invalid Credentials" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })
        console.log(user)
        return res.status(200).json({ message: "Login Successfully", user })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export const logout = async (req, res) => {
    try {
        req.clearCookie("token")
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}