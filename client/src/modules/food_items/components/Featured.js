//! Ant Imports

import { Space } from "antd";

//! Ant Icons

import { StarFilled, StarOutlined } from "@ant-design/icons";

function Featured({ itemData, handleFeaturedClick }) {
  const IconText = ({ text }) => (
    <Space>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => handleFeaturedClick(itemData)}
      >
        {itemData.featured ? <StarFilled /> : <StarOutlined />}
      </div>
      {text}
    </Space>
  );

  return (
    <IconText
      text={itemData.featured ? "Featured" : ""}
      key="list-vertical-star-o"
    />
  );
}

export default Featured;
