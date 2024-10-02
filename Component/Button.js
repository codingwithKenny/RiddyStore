import styled, { css } from "styled-components";
// import css from "styled-jsx/css";

export const ButtonStyle = css`
 border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.white &&
    css`
      background-color: #fff;
      color: #222;
    `}
  ${(props) => props.gray && css``}
    ${(props) =>
    props.primary &&
    css`
      background-color: pink;
      color: #fff;
    `}
    ${(props) =>
    props.size === "l" &&
    css`
      font-size: i.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}`

const StyledButton = styled.button`
  ${ButtonStyle}
 
`;
export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
