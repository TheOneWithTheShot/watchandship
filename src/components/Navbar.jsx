'use client';
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "/src/firebase";
import { navLinks } from "@/constants";

const Navbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
    const [authUser] = useAuthState(auth);
    const loginTitle = 'login';

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out successful");
            })
            .catch((error) => console.log(error));
    };



    return (
        <nav className="w-full flex py-6 justify-between items-center navbar">
            <img src="/logo.svg" alt="watch&ship" className="logo w-[124px] h-[100px]" />

            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                {navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                            } mr-10`}
                        onClick={() => setActive(nav.title)}
                    >
                        <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                ))}
                <li
                    className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite mr-10"
                >
                    {authUser ? (
                        <>
                            <a href="/profile" className="mr-10">{authUser.email}</a>
                            <button onClick={userSignOut}>Sign Out</button>
                        </>

                    ) : (
                        <a href="/login">{loginTitle}</a>
                    )}
                </li>
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                    src={toggle ? "/close.svg" : "/menu.svg"}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle(!toggle)}
                />

                <div
                    className={`${!toggle ? "hidden" : "flex"
                        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {navLinks.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                    } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={() => setActive(nav.title)}
                            >
                                <a href={`#${nav.id}`}>{nav.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
