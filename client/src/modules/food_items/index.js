//! Ant Imports

import { List, Card } from "antd";

function FoodItems({ restaurantFoodItems }) {
  return (
    <Card>
      <List
        className="mx-1"
        itemLayout="vertical"
        size="large"
        dataSource={restaurantFoodItems}
        locale={{ emptyText: "This restaurant is not serving at the moment" }}
        renderItem={(item) => (
          <List.Item
            key={item.item_id}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<span className="sdp-text-strong">{item.item_name}</span>}
              description={item.recipe}
            />
            <div className="px">{item.ingredients}</div>
            <div className="px">Preparation Time: {item.preparation_time}</div>
            <div className="px">Price: ${item.price}</div>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default FoodItems;
