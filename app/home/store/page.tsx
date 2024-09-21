import React from "react";
import { getSession } from "@/lib";
import { redirect } from "next/navigation";
import StoreItems from "./(components)/store-items";

const  Store = async () => {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <StoreItems />
  );
}

export default Store;
