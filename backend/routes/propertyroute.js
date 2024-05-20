const express=require('express')
const router=express.Router()

const propertycontroller=require('../controller/propertycontroller')

router.post('/properties', propertycontroller.createProperty)
router.get('/properties/:id', propertycontroller.getProperties)
router.put('/properties/:id', propertycontroller.updateProperty)
router.delete('/properties/:id', propertycontroller.deleteProperty)
router.get('/sellerproperties', propertycontroller.sellergetproperty)

module.exports=router
