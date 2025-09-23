"use client";

import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";
import { FormEvent } from "react";

type LoginDto = {
  email: string;
  password: string;
};

const initialValues: LoginDto = {
  email: "test5@mail.com",
  password: "12345test",
};


export default function LoginForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: LoginDto = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    dispatch(login(values));
    console.log("Form submitted:", values);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required  className="border-2" defaultValue={initialValues.email}/>
      <input name="password" type="password" placeholder="Password" required className="border-2" defaultValue={initialValues.password}/>
      <button type="submit">Login</button>
    </form>
  );
}
