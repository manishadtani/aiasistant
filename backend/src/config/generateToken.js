import jwt from 'jsonwebtoken'

const genToken = async (userId) => {
        try {
            const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"10d"})
            return token
        } catch (error) {
                console.log(error+ " error in generate token file")
                res.statu(500).json({message:"Internal server error"})
        }
}

export default genToken