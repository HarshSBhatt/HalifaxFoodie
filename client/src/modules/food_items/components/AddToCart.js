import { useContext, useState } from "react";
import _ from "lodash";

//! Ant Imports

import { Button } from "antd";

//! Ant Icons

import { PlusOutlined } from "@ant-design/icons";

//! User Files

import * as ActionTypes from "common/actionTypes";
import MyCartDrawer from "./MyCartDrawer";
import { AppContext } from "AppContext";
import { toast } from "common/utils";

function AddToCart({ itemData }) {
  const {
    dispatch,
    state: { cart },
  } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  //   const [isInCart, setIsInCart] = useState({
  //     inCart: false,
  //     quantity: 0,
  //     itemId: -1,
  //   });

  const myCart = [...cart];

  //   useEffect(() => {
  //     const itemIndex = _.findIndex(cart, (foodItem) => {
  //       return foodItem.itemId === itemData.item_id;
  //     });
  //     if (itemIndex !== -1) {
  //       setIsInCart({
  //         ...isInCart,
  //         inCart: true,
  //         quantity: cart[itemIndex].quantity,
  //         itemId: itemIndex,
  //       });
  //     }
  //   }, [cart]);

  const showDrawer = (itemData) => {
    const restaurantId = itemData.restaurant_id;
    const itemId = itemData.item_id;
    const itemName = itemData.item_name;
    const price = itemData.price;
    const foodPhotoUrl = itemData.food_photo_url;

    const foodItem = {
      foodPhotoUrl,
      itemId,
      itemName,
      price,
      quantity: 1,
      totalPrice: price,
      restaurantId,
    };

    let restaurantIds = [];
    if (cart.length) {
      restaurantIds = _.map(cart, "restaurantId");
    }

    const addToCart = (itemId) => {
      const itemIndex = _.findIndex(cart, (item) => {
        return item.itemId === itemId;
      });
      if (itemIndex === -1) {
        myCart.push(foodItem);
        dispatch({ type: ActionTypes.SET_CART, data: myCart });
      } else {
        cart[itemIndex] = {
          ...cart[itemIndex],
          quantity: cart[itemIndex].quantity + 1,
          totalPrice: cart[itemIndex].totalPrice + price,
        };
        dispatch({ type: ActionTypes.SET_CART, data: cart });
      }
    };

    if (restaurantIds.length === 0) {
      setVisible(true);
      addToCart(itemId);
    } else {
      if (
        restaurantIds.length > 0 &&
        restaurantIds.every((id) => id === restaurantId)
      ) {
        setVisible(true);
        addToCart(itemId);
      } else {
        toast({
          message: "Currently we are taking orders of 1 restaurant at a time",
          type: "info",
        });
      }
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  //   const removeItem = (id) => {
  //     const updatedCart = cart.filter((item) => item.itemId !== id);
  //     dispatch({ type: ActionTypes.SET_CART, data: updatedCart });
  //   };

  //   const handleQty = (operation, item) => {
  //     if (operation === "add") {
  //       cart[isInCart.itemId] = {
  //         ...cart[isInCart.itemId],
  //         quantity: cart[isInCart.itemId].quantity + 1,
  //         totalPrice: cart[isInCart.itemId].totalPrice + item.price,
  //       };
  //     } else {
  //       cart[isInCart.itemId] = {
  //         ...cart[isInCart.itemId],
  //         quantity: cart[isInCart.itemId].quantity - 1,
  //         totalPrice: cart[isInCart.itemId].totalPrice - item.price,
  //       };
  //     }
  //     setIsInCart({
  //       ...isInCart,
  //       quantity: cart[isInCart.itemId].quantity,
  //     });
  //     dispatch({ type: ActionTypes.SET_CART, data: cart });
  //   };

  //   const addQty = (itemId) => {
  //     handleQty("add", itemId);
  //   };

  //   const subtractQty = (itemId) => {
  //     console.log(itemId);
  //     if (cart[itemId].quantity === 1) {
  //       removeItem(itemId);
  //       setIsInCart({
  //         ...isInCart,
  //         itemId: -1,
  //         quantity: 0,
  //         inCart: false,
  //       });
  //     } else {
  //       handleQty("sub", itemId);
  //     }
  //   };

  //   const renderButton = isInCart.inCart ? (
  //     <>
  //       <Button
  //         type="ghost"
  //         size="small"
  //         onClick={() => subtractQty(isInCart.itemId)}
  //         icon={<MinusOutlined />}
  //       />
  //       <span className="mx-8">{isInCart.quantity}</span>
  //       <Button
  //         type="ghost"
  //         size="small"
  //         onClick={() => addQty(isInCart.itemId)}
  //         icon={<PlusOutlined />}
  //       />
  //     </>
  //   ) : (
  //     <Button
  //       onClick={() => showDrawer(itemData)}
  //       type="primary"
  //       icon={<PlusOutlined />}
  //     >
  //       Add to Cart
  //     </Button>
  //   )

  return (
    <div>
      <Button
        onClick={() => showDrawer(itemData)}
        type="primary"
        icon={<PlusOutlined />}
      >
        Add to Cart
      </Button>
      <MyCartDrawer onClose={onClose} visible={visible} />
    </div>
  );
}

export default AddToCart;
