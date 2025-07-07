const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captianModel = require('../models/captian.model');


module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token||req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthrised"})
    }
const isBlackListed = await userModel.findOne({token:token})
if(isBlackListed){
    res.status(401).json({message:'unauthorized'})
}
    try{
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await userModel.findById(decoded._id)
req.user = user;
return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorised"})
    }
}

module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies.token||req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthrised"})
    }
const isBlackListed = await blacklistTokenModel.findOne({token:token})
if(isBlackListed){
    res.status(401).json({message:'unauthorized'})
}
    try{
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const captain = await captianModel.findById(decoded._id)
req.captain = captain;
return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorised"})   
}
}





