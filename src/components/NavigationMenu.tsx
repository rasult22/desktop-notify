import { Link } from "@tanstack/react-router";
import React from "react";
import LangToggle from "./LangToggle";
import logo from '@/images/logo.svg'


export default function NavigationMenu() {
    return (
        <nav>
            <ul className="flex justify-center gap-2 p-4 text-sm">
                <img className="logo w-[100px] mr-auto" src={logo} alt="" />
                <LangToggle />
            </ul>
        </nav>
    );
}
