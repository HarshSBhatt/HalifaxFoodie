import { useParams } from "react-router-dom";

function ParticularOrder() {
  const params = useParams();
  const orderId = params?.orderId;
  return <div>{orderId}</div>;
}

export default ParticularOrder;
