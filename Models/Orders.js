const { Schema, model, models, default: mongoose } = require("mongoose");


const OrderSchema = new Schema({

    line_items:Object,
    name:String,
    email:String,
    city:String,
    postalCode:String,
    streetAddress:String,
    country:String,
    paid:Boolean,
   
})

export const Orders = models.Orders || model('Orders',OrderSchema)