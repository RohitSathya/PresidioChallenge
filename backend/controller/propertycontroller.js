const propertymodel = require('../models/propertymodel');

const createProperty=async(req,res)=>{
    const data=await propertymodel.create(req.body)
    res.json(data);

}
const getProperties=async(req,res)=>{
    const id=req.params.id
    const data = await propertymodel.find({sellerId:id});
    if(!data||data==''){
        res.json({message:'failed'})
    }
    else{
        res.json({data:data});

    }
   

}
const updateProperty=async(req,res)=>{
    const id=req.params.id

    const data = await propertymodel.findOneAndUpdate({_id:id}, req.body, { new: true });
    res.json(property);

}
const deleteProperty=async(req,res)=>{
    const data=  await propertymodel.findOneAndDelete({_id:req.params.id});
    

}
const sellergetproperty=async(req,res)=>{
   
    const data = await propertymodel.find();
    if(!data||data==''){
        res.json({message:'failed'})
    }
    else{
        console.log(data)
        res.json({data:data});

    }
   

}
module.exports={createProperty,getProperties,updateProperty,deleteProperty,sellergetproperty}

