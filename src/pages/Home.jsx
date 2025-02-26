import React, { useState } from "react";
import { styled } from "styled-components";
import menuData from "../component/json/menu.json";
import { v4 as uuid } from "uuid";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    padding-left: 50px;
  }
`;
const UpperContainer = styled.div`
  border: 1px solid red;
  display: flex;
  padding: 10px;
  gap: 10px;
`;
const BottomContainer = styled.div`
  border: 1px solid blue;
`;
const MenuContainer = styled.div`
  width: 70%;
`;
const BillContainer = styled.div`
  width: 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  max-height: 550px;
  border: 1px solid gray;

  h3 {
    margin: 0;
  }
`;
const MenuList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  width: 100%;
  height: 100%;

  button {
    background-color: lightblue;
    padding: 10px 10px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    background-color: #42a7ff;
    transition: 0.12s ease-in;
  }
`;

const OrderItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  padding: 20px 0;
  gap: 3px;
  overflow-y: scroll;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

function Home() {
  const [menuList, setMenuList] = useState(menuData);
  const [billList, setBillList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log("menuList", menuList);

  const addItemToBill = (menu_name, price) => {
    const newOrder = {
      id: uuid(),
      menu_name,
      price: Number(price),
    };
    setOrderList((prevOrders) => [...prevOrders, newOrder]);
    setTotalPrice((prevPrice) =>
      Math.round(((prevPrice + newOrder.price) * 100) / 100)
    );
    // In JavaScript, floating-point arithmetic can sometimes lead to unexpected results due to the IEEE 754 floating-point standard.
  };

  return (
    <HomeContainer>
      <h1>POS</h1>
      <UpperContainer>
        {/* Menu */}
        <MenuContainer>
          <MenuList>
            {menuList?.map((menu, index) => {
              return (
                <MenuItem key={index}>
                  <button
                    onClick={() => addItemToBill(menu.menu_name, menu.price)}
                  >
                    {menu.menu_name}
                  </button>
                </MenuItem>
              );
            })}
          </MenuList>
        </MenuContainer>
        {/* Bills */}
        <BillContainer>
          <h3>Bills</h3>
          <OrderItemContainer>
            {orderList.map((item) => {
              return (
                <OrderItem key={item.id}>
                  <span>{item.menu_name}</span>
                  <span>{item.price}</span>
                </OrderItem>
              );
            })}
          </OrderItemContainer>
          <p>Total: {totalPrice}</p>
        </BillContainer>
      </UpperContainer>
      <BottomContainer>
        {/* Checkout */}
        <div>cal</div>
      </BottomContainer>
    </HomeContainer>
  );
}

export default Home;
