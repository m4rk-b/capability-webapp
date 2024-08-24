import Link from "next/link";
import React from "react";

type User = {
  userPoints: string,
}
const NavSettings: React.FC<User> = ({userPoints}) => {
  return (
    <>
      <div className="navbar-end">
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p>Current Points: {userPoints}</p>
                </li>
                <li>
                  <a href="">Profile</a>
                </li>
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </>
  );
}

export default NavSettings;
