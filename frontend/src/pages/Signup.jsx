import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext'
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate()
    const {serverUrl} = useContext(userDataContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()  
        setErr("")
        try {
           let result = await axios.post(`${serverUrl}/api/auth/signup`,{
            name,email,password
           },{withCredentials:true})

           setName("")
           setEmail("")
           setPassword("")

           console.log(result)
        } catch (error) {
            console.log(error)
            setErr(error.response?.data?.message)
        }
    }


    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-teal-800 animate-gradient-flow"></div>
            <div className="absolute inset-0 bg-radial-glow opacity-40"></div>
            <div className="absolute inset-0 opacity-25">
                <div className="particle absolute w-2 h-2 bg-blue-300 rounded-full animate-float-slow" style={{ top: '15%', left: '20%', animationDelay: '0s' }}></div>
                <div className="particle absolute w-3 h-3 bg-purple-400 rounded-full animate-float" style={{ top: '40%', left: '75%', animationDelay: '1.5s' }}></div>
                <div className="particle absolute w-2 h-2 bg-teal-300 rounded-full animate-float-fast" style={{ top: '65%', left: '30%', animationDelay: '0.8s' }}></div>
                <div className="particle absolute w-4 h-4 bg-white rounded-full animate-float" style={{ top: '25%', left: '50%', animationDelay: '2.2s' }}></div>
                <div className="particle absolute w-2 h-2 bg-blue-500 rounded-full animate-float-slow" style={{ top: '80%', left: '10%', animationDelay: '1.2s' }}></div>
            </div>
            <motion.div
                className="relative p-10 rounded-3xl w-full max-w-md bg-gray-900 bg-opacity-80 backdrop-blur-xl border border-gray-700/50 shadow-2xl z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {err.length > 0 && <p className='text-red-500'>
                        *{err}
                    </p>}
                <h2 className="text-4xl font-extrabold text-white text-center mb-8 tracking-tight">Join Zen AI</h2>
                <form className="space-y-7" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-200">Name</label>
                        <motion.input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field w-full mt-2 p-4 bg-gray-800/50 text-white border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-gray-800/70 transition-all duration-300"
                            placeholder="Enter your name"
                            required
                            whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-200">Email</label>
                        <motion.input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field w-full mt-2 p-4 bg-gray-800/50 text-white border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-gray-800/70 transition-all duration-300"
                            placeholder="Enter your email"
                            required
                            whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-200">Password</label>
                        <motion.input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field w-full mt-2 p-4 bg-gray-800/50 text-white border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-gray-800/70 transition-all duration-300"
                            placeholder="Enter your password"
                            required
                            whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        Sign Up
                    </motion.button>
                </form>
                <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="text-sm text-gray-300">
                        Already have an account?{' '}
                        <Link
                            to="/signin"
                            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Signup