import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

//! Ant Imports

import { Card, Descriptions, PageHeader } from "antd";

//! User Files

import { AppContext } from "AppContext";
import api from "common/api";
import { ORDER_STATUS } from "common/constants";
import { toast } from "common/utils";
import Loading from "components/Loading";
import Error404 from "Error404";
import FoodItems from "modules/food_items";

function ParticularOrder() {
  const {
    state: { authToken },
  } = useContext(AppContext);
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const params = useParams();

  const orderId = params?.orderId;
  const orderStatus = orderData?.order_status;
  const restaurantName = orderData?.restaurant_name;
  const updatedAt = orderData?.updated_at;
  const orderAmount = orderData?.order_amount;
  const orderItems = orderData?.orderItems;

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { data } = response;
      setOrderData(data);
    } catch (err) {
      setErr(true);
      toast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (err) return <Error404 />;
  console.log(orderData);
  return (
    <div>
      <div className="mx-1 sdp-text-strong heading">Order Details</div>
      <Card className="mb-1">
        <PageHeader
          title={restaurantName}
          subTitle={<span>Last update: {moment(updatedAt).fromNow()}</span>}
        >
          <Descriptions size="small" column={4}>
            <Descriptions.Item label="Order ID">{orderId}</Descriptions.Item>
            <Descriptions.Item label="Status">
              {ORDER_STATUS[orderStatus]}
            </Descriptions.Item>
            <Descriptions.Item label="Order Total">
              ${orderAmount}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <a href={`tel:${orderData?.phone_number}`}>
                {orderData?.phone_number}
              </a>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Card>
      <div className="mx-1 sdp-text-strong heading">Dishes</div>
      <FoodItems restaurantFoodItems={orderItems} isOrderPage />
    </div>
  );
}

export default ParticularOrder;
