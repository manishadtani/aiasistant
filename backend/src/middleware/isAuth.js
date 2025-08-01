import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
        try {
            const token = req.cookies.token
            if(!token) return res.status(400).json({message:"Token not found"})
            const verifyToken = jwt.verify(token,process.env.JWT_SECRET) 
        console.log(verifyToken.userId) 
            req.userId = verifyToken.userId
             next()
        } catch (error) {
                console.log(error)
                return res.status(500).json({message:"is Auth error"})
        }
}

export default isAuth