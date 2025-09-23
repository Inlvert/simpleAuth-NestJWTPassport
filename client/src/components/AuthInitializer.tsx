"use client";

import { useAppDispatch } from "@/redux/hooks";
import { getprofile } from "@/redux/slices/authSlice";
import { useEffect } from "react";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if(accessToken) {
      dispatch(getprofile())
    }
  }, [dispatch])

  return null
}