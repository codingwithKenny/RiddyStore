import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/Models/product";

export default async function  handler(req,res){
    await mongooseConnect()

    const ids = req.body.ids


    try {
        res.json(await Product.find({_id:ids}))
    } catch (error) {

        console.log(error)
        
    }

}