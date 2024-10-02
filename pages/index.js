import Feature from "@/Component/Feature";
import Header from "@/Component/Header";
import NewProducts from "@/Component/NewProducts";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/Models/product";

export default function HomePage({FeatureProduct,newProducts}) {
   //  console.log(newProducts)  // to check if the data is fetched successfully
   return(
    <div>
      <Header/> 
      <Feature products={FeatureProduct}/>
      <NewProducts products={newProducts}/>
    </div>
   )
  
}

export async function getServerSideProps(){
   const featureProductId = "66fc646204902b760b80d380"
   await mongooseConnect()

   const FeatureProduct = await Product.findById(featureProductId)
   const newProducts = await Product.find({},null,{sort:{'_id':-1},limit:9})
   return{
      props:{
         FeatureProduct:JSON.parse(JSON.stringify(FeatureProduct)),
         newProducts:JSON.parse(JSON.stringify(newProducts)),
      
      },
  
   }

}