import mongooseConnect from "@/lib/mongoose"
import { Product } from "@/Models/product"

export default async function handler(req,res){

    if (req.method !== "POST"){
        res.json('should be a POST request')
    }

    
const {name,email,city,postalCode,streetAddress,country,product} = req.body
await mongooseConnect()
const productIds = product.split(',')
const uniqueIds =[...new Set(productIds)]
const productsInfo = await Product.find({_id: uniqueIds})

let Line_items =[]
uniqueIds.forEach((productId)=>{
    const prodInfo = productsInfo.find(p=> p._id.toString() == productId)
    const quantity = productIds.filter(p=> p._id == productId)?.length || 0

    if (quantity > 0 && prodInfo) {
        Line_items.push({
            quantity,
            price_data:{
                currency:'USD',
                product_data:{name:prodInfo.name},
                unit_amount: quantity * prodInfo
                
            }
        })
    }


})
     res.json({Line_items})
}
