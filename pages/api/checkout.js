import mongooseConnect from "@/lib/mongoose";
import { Orders } from "@/Models/Orders";
import { Product } from "@/Models/product";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;
  await mongooseConnect();
  
  const productIds = cartProducts
  const uniqueIds = [...new Set(productIds)];
  const productsInfo = await Product.find({_id:uniqueIds });

  let line_items = [];

  uniqueIds.forEach((productId) => {
    const prodInfo = productsInfo.find(p => p._id.toString() === productId);
    const quantity = productIds.filter(p => p === productId).length || 0;

    if (quantity > 0 && prodInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: prodInfo.title },
          unit_amount: prodInfo.price *100
                },
      });
    }
  });

//  Post to Database
  const OrderDoc = await Orders.create({
    line_items,name,email,city,postalCode,streetAddress,country,paid:false,
   })

   const session = await stripe.checkout.sessions.create({
    line_items,
    mode:"payment",
    customer_email:email,
    success_url:process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url:process.env.PUBLIC_URL + '/cart?cancelled=1',
    metadata:{orderId:OrderDoc._id.toString()}


   })
   res.json({
    url:session.url
   })
}
