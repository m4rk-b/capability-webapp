import React from "react";
import { fetchSingleUser, getSession } from "@/lib";
import NavMenu from "./nav-menu";
import NavLogo from "./nav-logo";
import NavSettings from "./nav-settings";
import { redirect } from "next/navigation";

type User = {
  points: string,
}

async function NavBar() {
    const session = await getSession();
    if (!session) {
        redirect('/login');
    }
      const userPoints: User = await fetchSingleUser(session.id);
  return (
    <>
      <div className="navbar bg-base-100 shadow xl:px-10 px-0 fixed top-0 left-0 right-0 z-10">
        <NavMenu />
        <NavLogo />
        <NavSettings userPoints={userPoints.points}/>
      </div>
    </>
  );
}

export default NavBar;