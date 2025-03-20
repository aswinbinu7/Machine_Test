import styled from "styled-components";
import menuItemsBg from "../../../assets/menuItemsBg.png";
import axios from "axios";
import { useEffect, useState } from "react";

interface MenuItemModel {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface Props {
  selectedCategory: string;
}

export default function MenuItemsHeader({ selectedCategory }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>([]);

  useEffect(() => {
    if (!selectedCategory) return;

    axios
      .get<MenuItemModel[]>(
        `https://machine-test-19s0.onrender.com/menus?categoryId=${selectedCategory}`
      )
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, [selectedCategory]);

  return (
    <SC_MenuItemsComponent bgImage={menuItemsBg}>
      {menuItems.length > 0 ? (
        <SC_SliderContainer>
          <SC_MenuItemsWrapper>
            <SC_MenuItemHeading>
              <div className="data">BRUNCH COCKTAILS</div>
            </SC_MenuItemHeading>
            {menuItems.slice(0, 3).map((item) => (
              <SC_MenuItem key={item._id}>
                <div className="itemName">
                  <h3>{item.name}</h3>
                  <span className="connector"></span>
                  <span className="itemPrice">${item.price.toFixed(2)}</span>
                </div>
                <p className="accentFont">{item.description}</p>
              </SC_MenuItem>
            ))}
          </SC_MenuItemsWrapper>
        </SC_SliderContainer>
      ) : (
        <p>No menu items found for this category.</p>
      )}
    </SC_MenuItemsComponent>
  );
}

const SC_MenuItemsComponent = styled.div<{ bgImage: string }>`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  padding: 20px;
  color: white;
`;

const SC_SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 900px;
  position: relative;
`;

const SC_MenuItemsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid white;
  width: 100%;
  justify-content: flex-start;
  background: transparent;
  flex-wrap: wrap;
`;

const SC_MenuItem = styled.div`
  background: transparent;
  color: white;
  padding: 15px;
  text-align: center;
  width: calc(50% - 50px);
`;

const SC_MenuItemHeading = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
