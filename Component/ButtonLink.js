// import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
${ButtonLink}
`

export default function ButtonLink({props}){
    return(
        <StyledLink href="" {...props}/>
    )
}