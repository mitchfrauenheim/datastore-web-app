import React from "react";
import { NavLink } from "react-router-dom"

export default function PageLink(props) {
    // Styling applied to active link
    let activeClassName = "text-sky-400 font-semibold"
    let inactiveClassName = "text-slate-300 font-medium hover:text-slate-100"

    return (
        <NavLink to={props.data.route} className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            <div id="link-wrapper" className="flex flex-row items-center my-1 px-2 py-2 space-x-3 rounded-md hover:bg-white hover:bg-opacity-30">
                <div id="link-icon"> 
                    {props.data.icon}
                </div>
                <div id="link-name" className="text-sm">
                    {props.data.name}
                </div>
            </div>
        </NavLink>
    );
}