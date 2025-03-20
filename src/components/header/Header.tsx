import styled from "styled-components";

function Header() {
  return (
    <SC_HeaderComponent>
      <div className="logo">
        <BlueText>Deep </BlueText> Net <RedText>Soft</RedText>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a>Reservation</a>
          </li>
          <li>
            <a>Menu</a>
          </li>
          <li>
            <a>Make a Reservation</a>
          </li>
          <li>
            <a>Contact US</a>
          </li>
        </ul>
      </div>
    </SC_HeaderComponent>
  );
}
const SC_HeaderComponent = styled.div`
  display: flex;
  background-color: #121618;
  padding: 1em 5em 0.2em 5em;
  .logo {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    font-size: 35px;
    color: white;
  }
  .menu {
    display: flex;
    width: 50%;
    ul {
      list-style: none;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      gap: 0.8em;
      text-transform: uppercase;
      li {
        a {
          color: white;
        }
      }
    }
  }
`;

const RedText = styled.span`
  color: grey;
  margin-left: 9px;
`;

const BlueText = styled.span`
  color: blue;
  margin-right: 9px;
`;

export default Header;
