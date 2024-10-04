import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
  height:300px;
 
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size:2.5rem;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  img {
    max-width: 100%;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;
const ButtonLink = styled(Link)`
text-decoration: none;
color: #fff;
`
export default function Feature({products}) {
 const {addProduct} = useContext(CartContext)

  function addFeatureToCart() {
    addProduct(products._id)

    
  }
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <div>
            <Title>{products.title}</Title>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue
            </Desc>
            <ButtonWrapper>
              <Button white={1} >
                <ButtonLink  href={'/product/'+products._id}>
                Read MOre
                </ButtonLink>
                
              </Button>
              <Button 
              primary={1}
              onClick={addFeatureToCart}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                Add to Cart
              </Button>
            </ButtonWrapper>
          </div>
          <div>
            <img src="https://img.freepik.com/premium-photo/heart-symbol-laptop-with-pink-window-light-concept-3d-rendering_974732-6740.jpg" />
          </div>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
