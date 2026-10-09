"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ScreenLoader from "@/components/shared/ScreenLoader";
import { useAppDispatch } from "@/redux/app/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    router.replace("/login");
  }, [dispatch, router]);

  return <ScreenLoader />;
};

export default LogoutPage;
