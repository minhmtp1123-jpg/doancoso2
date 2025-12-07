import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // Accept token from Authorization header (Bearer ...) or a custom `token` header
        let token = req.headers.authorization || req.headers.token || req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({success:false, message: "Not authorized - token missing"});
        }

        if (typeof token === 'string' && token.toLowerCase().startsWith('bearer ')) {
            token = token.slice(7).trim();
        }

        // Handle .env values that may have been saved with quotes by trimming them
        const jwtSecret = (process.env.JWT_SECRET || '').replace(/"/g, '').trim();
        const adminEmail = (process.env.ADMIN_EMAIL || '').replace(/"/g, '').trim();

        const tokendecoded = jwt.verify(token, jwtSecret);

        // For admin tokens we expect payload to contain `email`
        if (!tokendecoded || tokendecoded.email !== adminEmail) {
            return res.status(401).json({success:false, message: "Not authorized - invalid admin token"});
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false, message: error.message});
    }
}

export default adminAuth;
