import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="flex flex-col item-center h-screen bg">
      <div className="h-60 w-100 fg ">
        <h1 className="text-2xl item-center p-1">Skill-Craftify</h1>
      </div>
      <div className="flex flex-col justify-center item-center h-screen">
        <div className="card w-400 p-3 ">
          <div className="flex flex-col">
            <h1 className="text-2xl">Login</h1>
            <div className="divider"></div>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item name="email" label="Email">
                <input className="pt-2" style={{width:"90%",height:"35px"}}type="text" />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <input className="pt-2" style={{width:"90%",height:"35px"}} type="password" />
              </Form.Item>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
    
                  className="primary-contained-btn mt-2 w-100"
                >
                  Login
                </button>
                <Link to="/register">
                  <b>Not a member? Register</b>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
