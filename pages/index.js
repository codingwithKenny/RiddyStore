import Feature from "@/Component/Feature";
import Header from "@/Component/Header";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/Models/product";

export default function HomePage({products}) {
   // console.log(products)  // to check if the data is fetched successfully
   return(
    <div>
      <Header/> 
      <Feature products={products}/>
    </div>
   )
  
}

export async function getServerSideProps(){
   const featureProductId = "66fc646204902b760b80d380"
   await mongooseConnect()

   const products = await Product.findById(featureProductId)
   return{
      props:{products:JSON.parse(JSON.stringify(products))},
  
   }

}