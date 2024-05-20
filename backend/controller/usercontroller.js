const usermodel=require('../models/usermodel')

const register=async(req,res)=>{
    const {email}=req.body
    const findexistuser=await usermodel.findOne({email:email})
    if(!findexistuser||findexistuser==''){
        const data=await usermodel.create(req.body)
        res.json({message:'User Created Succesfully',ud:data})
    }
    else{
        res.json({message:'User Already Exists'})
    }

}
const login=async(req,res)=>{
    const {email,password}=req.body
    const data=await usermodel.findOne({email:email,password:password})
    if(!data||data==''){
        res.json({message:'Login Failed'})
    }
    else{
        res.json({message:'Login Success',ud:data})
    }

}
module.exports={register,login}