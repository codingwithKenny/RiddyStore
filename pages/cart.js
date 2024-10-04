import Button from "@/Component/Button";
import { CartContext } from "@/Component/CartContext";
import Center from "@/Component/Center";
import Header from "@/Component/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.7fr;
  margin-top: 20px;
 border: 1px solid red;
  width: 100%;
`;

const TableHeader = styled.div`
  display: contents; 
  font-weight: bold;
  text-align: center;
//    border: 1px solid red;

`;

const TableRow = styled.div`
  display: contents; 
  text-align: center;
   border: 1px solid red;

`;

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (cartProducts.length) {
      axios
        .post('/api/cart', { ids: cartProducts })
        .then((response) => {
            setProduct(response.data); 
        });
    }
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {product && (
              <>
                <h2>Carts</h2>
            
                <Table>
                  <TableHeader>
                    <div>Product Title</div>
                    <div>Quantity</div>
                    <div>Price</div>
                  </TableHeader>
                  {product.map(product => (
                    <TableRow key={product._id}>
                      <div>{product.title}</div>
                      <div>{cartProducts.filter(id => id === product._id).length}</div>
                      <div>{product.price}</div>
                    </TableRow>
                  ))}
                </Table>
              </>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
              <h2>Order Information</h2>
              <Button block black>Continue to make payment</Button>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
