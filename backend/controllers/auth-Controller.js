const authModel =  require('../models/auth-model');
const AuthValidation = require('../configuration/validationSchema/auth');
const  { signAccessToken } = require('../configuration/Tokens/webtoken')
const createError = require('http-errors')

module.exports = {
    register:async(req, res, next)=>{
        try {
            const { email, password, confirmPassword } = req.body
            if (!email || !password || !confirmPassword) {
                throw createError.BadRequest()
            }
            const validatedBody = await AuthValidation.authUserSchema.validateAsync({email, password})

            if(password !== confirmPassword){
                throw createError.Conflict(`Password and confirm password must be same`)
            }
            const newUser = new authModel(validatedBody)
            const savedUser = await newUser.save()
            if (!savedUser) {
                throw createError.createError("can not Register user")
            }
            const accessToken = await signAccessToken(savedUser.id)
            res.send({
                email:newUser.email,
                id:newUser._id,
                accessToken: accessToken
                })
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422
            }
            next(error)
        }
    },
    login:async(req, res, next)=>{
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw createError.BadRequest()
            }
             await AuthValidation.authUserSchema.validateAsync({email, password})
            const user = await authModel.findOne({ email: req.body.email })
            if (!user) {
                return next(createError.NotFound("User not found"))
            }
            const accessToken = await signAccessToken(user.id)
            res.send({
                email:user.email,
                id:user._id,
                accessToken: accessToken
                })
        } catch (error) {
            if (error.isJoi === true) {
                return next(createError.BadRequest("Invalid username/password"))
            }
            next(error)
        }
    }
}