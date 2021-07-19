import { useContext } from "react";
import _ from "lodash";

//! Ant Imports

import { List, Avatar, Button, Drawer } from "antd";

//! User Files

import * as ActionTypes from "common/actionTypes";
import { AppContext } from "AppContext";
import { DeleteFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";

function MyCartDrawer({ onClose, visible }) {
  const {
    state: { cart },
    dispatch,
  } = useContext(AppContext);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.itemId !== id);
    dispatch({ type: ActionTypes.SET_CART, data: updatedCart });
  };

  const addQty = (item) => {
    const itemIndex = _.findIndex(cart, (foodItem) => {
      return foodItem.itemId === item.itemId;
    });
    cart[itemIndex] = {
      ...cart[itemIndex],
      quantity: cart[itemIndex].quantity + 1,
      totalPrice: cart[itemIndex].totalPrice + item.price,
    };
    dispatch({ type: ActionTypes.SET_CART, data: cart });
  };

  const subtractQty = (item) => {
    if (item.quantity === 1) {
      removeItem(item.itemId);
    } else {
      const itemIndex = _.findIndex(cart, (foodItem) => {
        return foodItem.itemId === item.itemId;
      });
      cart[itemIndex] = {
        ...cart[itemIndex],
        quantity: cart[itemIndex].quantity - 1,
        totalPrice: cart[itemIndex].totalPrice - item.price,
      };
      dispatch({ type: ActionTypes.SET_CART, data: cart });
    }
  };

  const orderAmount = _.sumBy(cart, (orderItem) => {
    return orderItem.totalPrice;
  });

  const title = <span className="sdp-text-strong">My Cart</span>;
  const footer = (
    <div className="flex item-center justify-space-between">
      <div>
        <span className="sdp-text-strong">Total: </span>
        <span>${orderAmount}</span>
      </div>
      <Button type="primary">Order</Button>
    </div>
  );

  return (
    <Drawer
      title={title}
      placement="right"
      width={500}
      onClose={onClose}
      visible={visible}
      footer={footer}
    >
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  style={{ width: 75, height: 75, objectFit: "cover" }}
                  src={item.foodPhotoUrl}
                />
              }
              title={
                <div className="flex item-center justify-space-between">
                  <span className="sdp-text-strong">{item.itemName}</span>
                  <Button
                    type="ghost"
                    size="small"
                    danger
                    onClick={() => removeItem(item.itemId)}
                    icon={<DeleteFilled />}
                  />
                </div>
              }
              description={
                <div className="flex">
                  <div>
                    <div className="px mr-1">
                      <span className="sdp-text-strong">Qty: </span>
                      <Button
                        type="ghost"
                        size="small"
                        onClick={() => subtractQty(item)}
                        icon={<MinusOutlined />}
                      />
                      <span className="mx-8">{item.quantity}</span>
                      <Button
                        type="ghost"
                        size="small"
                        onClick={() => addQty(item)}
                        icon={<PlusOutlined />}
                      />
                    </div>
                    <div className="px">
                      <span className="sdp-text-strong">Item Total: </span>$
                      {item.totalPrice}
                    </div>
                  </div>
                  <div className="px">
                    <span className="sdp-text-strong">Price: </span>$
                    {item.price}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default MyCartDrawer;
