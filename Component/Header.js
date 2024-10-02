import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledHeader = styled.header`
background-color:black;

`
const Logo = styled(Link)`
    color:#ffff;
`
const Wrapper = styled.div`
     display: flex;
     justify-content: space-between;
     padding: 20px 0;

`
const StyledNav = styled.nav`
     display: flex;
    gap:15px;

`
const NavLink = styled(Link)`
     color:#aaa;
     text-decoration: none;

`
export default function Header(){
    return(
        <StyledHeader>
            <Center>
                <Wrapper>
            <Logo href={'/'}>Ecommerce</Logo>
            <StyledNav>
                <NavLink href={"/"}>Home</NavLink>
                <NavLink href={"/products"}>All Product</NavLink>
                <NavLink href={"/category"}>Category</NavLink>
                <NavLink href={'/Account'}>Account</NavLink>
                <NavLink href={"/cart"}>Cart</NavLink>
            </StyledNav>
            </Wrapper>
            </Center>
        </StyledHeader>
    )
}