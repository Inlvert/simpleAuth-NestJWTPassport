'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Greeting() {

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

   const displayName = user ? `${user.id} ${user.email}` : "Guest";

  return (
    <>
    <h1>Greeting</h1>
    <h1>Hello {displayName}</h1>
    </>
  )
}