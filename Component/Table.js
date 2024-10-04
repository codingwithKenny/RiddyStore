import styled from "styled-components"

const StyledTable = styled.div`
width: 100%;
th{
text-align: left;

}

`;
export default function Table({props}){
 return(
     <StyledTable {...props}/>
 )
      
}