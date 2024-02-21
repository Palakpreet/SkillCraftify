import {Form} from "antd";
import React from 'react'
import {Link} from 'react-router-dom';

function Login() {
  const onFinish=(values)=>{
    console.log(values);
  };
  return (
    <div className="flex flex-col item-center h-screen bg">
        <div className="h-60 w-100 fg "><h1 className="text-2xl item-center p-1">Skill-Craftify</h1></div>
        <div className="flex flex-col justify-center item-center h-screen">
      <div className="card w-400 p-3 ">
        <div className="flex flex-col">
            <h1 className="text-2xl">Login</h1>
            <div className="divider"></div>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name='email' label='Email'>
                    <input className="w-95 h-40 pt-2" type="text"/>
                </Form.Item>
                <Form.Item name='password' label='Password'>
                    <input className="w-95 h-40 pt-2" type="password"/>
                </Form.Item>
                <div className="flex flex-col gap-2">
                <button type="submit" className="primary-contained-btn mt-2 w-100">Login</button>
                <Link to="/register"><b>Not a member? Register</b></Link>
                </div>
            </Form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login
