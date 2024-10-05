import Button from "@/Component/Button";
import { CartContext } from "@/Component/CartContext";
import Center from "@/Component/Center";
import Header from "@/Component/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "@/Component/Input";

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

const CartTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr;
  margin-top: 20px;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

const TableHeader = styled.div`
  display: contents;
  font-weight: 600;
  text-align: left;
  text-transform: uppercase;
  color: #ccc;
  font-size: 0.7rem;
  padding-bottom: 10px;
  border: 1px solid #red;
`;

const TableRow = styled.div`
  display: contents;
  padding: 10px 0;
`;

const ProductInfoCell = styled.div`
  align-items: center;
  gap: 10px;
  border-radius: 10px;
`;

const ImageBox = styled.div`
  max-width: 100px;
  max-height: 100px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 3px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;
const ProductTitle = styled.div`
  font-size: 0.5rem;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
`;

const CityWrapper = styled.div`
  display: flex;
 
  gap: 5px;
  
`;

// Your existing imports...

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts.length) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProduct(response.data);
      });
    } else {
      setProduct([]); // This will ensure product is an empty array when cart is empty
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0;
  product?.forEach((product) => {
    const quantity = cartProducts.filter((id) => id === product._id).length;
    const price = product.price * quantity;
    total += price;
  });

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            {!cartProducts?.length ? (
              <div>Your cart is empty</div>
            ) : (
              <>
                <h2>Your Cart</h2>
                <CartTable>
                  <TableHeader>
                    <div>Product Title</div>
                    <div>Quantity</div>
                    <div>Price</div>
                  </TableHeader>
                  {product?.map((product) => (
                    <TableRow key={product._id}>
                      <ProductInfoCell>
                        <ImageBox>
                          <img src={product.images[0]} alt={product.title} />
                        </ImageBox>
                        <ProductTitle>{product.title}</ProductTitle>
                      </ProductInfoCell>
                      <div>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        {cartProducts.filter((id) => id === product._id).length}
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </div>
                      <div>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </div>
                    </TableRow>
                  ))}
                  
                </CartTable>
                <Total>
                    <div>Total</div>
                    <h2>${total}</h2>
                  </Total>
              </>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
              <h2>Order Information</h2>
              <form method="post" action='/api/checkout'>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityWrapper>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalcode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityWrapper>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name='country'
                onChange={(e) => setCountry(e.target.value)}
              />
              <Input
               type='hidden'
               name='product'
               value={cartProducts.join(',')}
              />
              <Button block="true" black="true" type='submit'>
                Continue to make payment
              </Button>
              </form>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
