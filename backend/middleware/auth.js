import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {

    // Accept token in `token` header or `Authorization: Bearer <token>`
    const headerToken = req.headers && (req.headers.token || req.headers['authorization'])

    let token
    if (headerToken && typeof headerToken === 'string') {
        if (headerToken.startsWith('Bearer ')) {
            token = headerToken.split(' ')[1]
        } else {
            token = headerToken
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, login again' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: error.message })
    }

}

export default authUser


