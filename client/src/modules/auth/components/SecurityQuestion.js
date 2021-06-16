import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//! Ant Imports

import { Form, Input, Button, Typography } from "antd";

//! User Files

import { toast } from "common/utils";
import { AppContext } from "AppContext";
import * as ActionTypes from "common/actionTypes";
import { ROUTES } from "common/constants";
import api from "common/api";
import Loading from "components/Loading";
import { isEmpty } from "lodash";

const { Title } = Typography;

function SecurityQuestion() {
  const {
    state: { authenticated },
    dispatch,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { push, location } = useHistory();
  const onFinish = async (values) => {
    const { answer } = values;
    if (answer === "dummy") {
      if (isEmpty(location.state.currentUser)) {
        push(ROUTES.LOGIN);
      } else {
        const { currentUser } = location.state;
        dispatch({ type: ActionTypes.SET_TOKEN, data: currentUser.token });
        dispatch({ type: ActionTypes.SET_CURRENT_USER, data: currentUser });
        dispatch({ type: ActionTypes.SET_USER_ID, data: currentUser.uid });
        dispatch({ type: ActionTypes.SET_AUTHENTICATED, data: true });
        push(ROUTES.MAIN);
      }
    } else {
      toast({
        message: "Please enter correct answer!",
        type: "error",
      });
    }
  };

  const fetchAnswerOfUser = async () => {
    setLoading(true);
    if (isEmpty(location.state.currentUser)) {
      push(ROUTES.LOGIN);
    } else {
      const { uid } = location.state.currentUser;
      try {
        // TODO: Not working
        const response = await api.get(
          "https://xhdt9h76vl.execute-api.us-east-1.amazonaws.com/Test/security-questions",
          { uid }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      push("/");
    }
    fetchAnswerOfUser();
    // eslint-disable-next-line
  }, [authenticated]);

  if (loading) return <Loading />;
  return (
    <div className="login">
      <Title level={3} className="sdp-text-strong">
        Security Question
      </Title>
      <Title level={5}>This is question</Title>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="answer"
          rules={[{ required: true, message: "Please enter your answer" }]}
        >
          <Input placeholder="Answer" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SecurityQuestion;
