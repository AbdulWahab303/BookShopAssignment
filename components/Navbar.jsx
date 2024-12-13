"use client";
import React, { act, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "@/context/theme";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";


function Navbar({ children }) {
  const [active, setActive] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const {logout,session}=useUser();
  const router=useRouter();

  const handleLogout=async()=>{
    const result=await logout();
    if(result){
      router.push('/login');
    }
  }


  if(router.pathname==='/login'){
    return(
      <>
      {children}
      </>
    )
  }

  return (
    <>
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
        <Menu setActive={setActive} theme={theme}>
          <Link href={"/"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Home"
            ></MenuItem>
          </Link>
          <Link href={"/books"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Books"
            ></MenuItem>
          </Link>
          <Link href={"/books/authors"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Authors"
            ></MenuItem>
          </Link>
          <MenuItem setActive={setActive} active={active} item="Info">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/info/faqs">FAQs</HoveredLink>
              <HoveredLink href="/info/support">Support</HoveredLink>
              <HoveredLink href="/info/contact">Contact Us</HoveredLink>
            </div>
          </MenuItem>
          <Link href={"/search"}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Search"
            ></MenuItem>
          </Link>

          <MenuItem setActive={setActive} active={active} item="Switch Mode">
            <button
              onClick={toggleTheme}
              className={`p-1 bg-gray-200 rounded ${
                theme === "light" ? "bg-blue-700" : "bg-gray-700"
              }`}
            >
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </button>
          </MenuItem>
          <button onClick={handleLogout}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Logout"
            ></MenuItem>
          </button>
        </Menu>
      </div>
      {children}
    </>
  );
}

export default Navbar;
