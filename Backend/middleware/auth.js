import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

  
    if(!token){
        return res.json({success:false, message:"Not Authorized - No token provided"});
    }
  
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log("JWT verification error:", error);
        return res.json({success:false, message:"Invalid or expired token"});
    }
  }

export default authUser;


 // const {token} = {
    //     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWY3NGUzNGM0ZmEzYjU0YjYwYzcxZSIsImlhdCI6MTc0MzgzNzgyNH0.0rsbjpr7tcjjf0S69GaWy725CZs81OsDDHLhG0humuw"
    // };