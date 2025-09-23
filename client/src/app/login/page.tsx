import Greeting from "@/components/Greeting";
import Header from "@/components/Header";
import LoginForm from "@/components/LogingForm";
import React from "react";

function Login() {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <h1>Login</h1>
        <LoginForm />
        <Greeting/>
      </div>
    </div>
  );
}

export default Login;
