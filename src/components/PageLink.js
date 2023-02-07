import React from "react";
import { NavLink } from "react-router-dom"

export default function PageLink(props) {
    // Styling applied to active link
    let activeClassName = "text-blue-600 font-semibold"
    let inactiveClassName = "font-medium"

    return (
        <NavLink to={props.data.route} className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            <div id="link-wrapper" className="flex flex-row my-2 px-2 py-3 space-x-3 rounded-md hover:bg-slate-200">
                <div id="icon">
                    {props.data.icon}
                </div>
                <div id="name">
                    {props.data.name}
                </div>
            </div>
        </NavLink>
    );
}