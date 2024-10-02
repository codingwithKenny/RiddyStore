import styled from "styled-components";
import Button from "./Button";

const ImageBox = styled.div`
  display: flex;    
  justify-content: center;
  align-items: center;
  
`;

const Box = styled.div`
  background-color: #fff;
  padding: 10px;
//   border-radius: 10px;
  border: 1px solid #eaeaea;
  text-align: center;
  

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  
  }
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: normal;
  margin-top: 0px;
 
 
`;

const PriceWrapper = styled.div`
display:flex;
justify-content: space-between;

`;

export default function ProductBox({ _id, title, description, price, images }) {
  return (
    <Box>
      <ImageBox>
        <img src={images[0]} alt={title} />
      </ImageBox>
      <Title>{title}</Title>
      <PriceWrapper>
      <div>${price}</div>
      <Button primary={1}>Add to cart</Button>
      </PriceWrapper>
    </Box>
  );
}
