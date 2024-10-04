import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const ImageBox = styled(Link)`
  display: flex;    
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  
`;

const Box = styled.div`
  background-color: #fff;
  padding: 10px;
  border: 1px solid #eaeaea;
  text-align: center;
  

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  
  }
`;

const Title = styled(Link)`
  font-size: 1.1rem;
  font-weight: normal;
   margin-top: 10px;
  text-decoration: none;
  color: #000;
 
 
`;

const PriceWrapper = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
margin-top: 5px;

`;
const Price = styled.div`
font-size: 1.3rem;
font-weight: 900;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = `/product/${_id}`;
  const {addProduct} = useContext(CartContext)
  return (
    <Box>
      <ImageBox href={url}>
        <img src={images[0]} alt={title} />
      </ImageBox>
      <Title href={url}>{title}</Title>
      <PriceWrapper>
      <Price>${price}</Price>
      <Button
       primary={1} 
      outline={1}
      onClick={()=>addProduct(_id)}>Add to cart</Button>
      </PriceWrapper>
    </Box>
  );
}
