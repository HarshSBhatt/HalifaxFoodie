import { useContext, useEffect, useState } from "react";

//! User Files

import { AppContext } from "AppContext";
import api from "common/api";
import { toast } from "common/utils";
import Loading from "components/Loading";
import FoodItems from "modules/food_items";
import AddItem from "./components/AddItem";

function FoodMenu() {
  const {
    state: { authToken, userId },
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [restaurantFoodItems, setRestaurantFoodItems] = useState([]);

  const fetchRestaurantDetails = async () => {
    setLoading(true);
    try {
      const restaurantFoodData = await api.get(
        `/food-item/restaurant/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const { data } = restaurantFoodData;
      setRestaurantFoodItems(data);
    } catch (error) {
      setError(true);
      toast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="menu-wrapper">
      <AddItem />
      <FoodItems restaurantFoodItems={restaurantFoodItems} />
    </div>
  );
}

export default FoodMenu;
