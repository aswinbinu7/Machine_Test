import styled from "styled-components";
import menuBg from "../../../assets/menuHeaderBg.png";

function MenuHeader() {
  return (
    <SC_MenuHeaderComponent bgImage={menuBg}>
      <div className="mainHeading">MENU</div>
      <div className="subHeading accentFont">
        <p>
          Please take a look at our menu featuring food, drinks, and brunch. If
          you'd like to place an order, use the "Order Online" button located
          below the menu.
        </p>
      </div>
    </SC_MenuHeaderComponent>
  );
}

const SC_MenuHeaderComponent = styled.div<{ bgImage: string }>`
  height: 15em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  justify-content: center;
  color: white;
  .mainHeading {
    font-size: 75px;
  }
  .subHeading {
    width: 50%;
    text-align: center;
  }
`;

export default MenuHeader;
