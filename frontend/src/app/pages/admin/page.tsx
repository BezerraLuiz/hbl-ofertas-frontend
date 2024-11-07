'use client'

import { useEffect } from "react";
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const response = localStorage.getItem("user")
    if (response != "admin") {
      router.push("/pages/auth")
    }
  }, [])

  return (
    <>
      <Header/>
    </>
  );
}
