import React from "react";
import { NavLink } from "react-router-dom";

export default function PageLinkSmall(props) {
    // Styling applied to active link
    let activeClassName = "text-sky-400"
    let inactiveClassName = "text-slate-300 hover:text-slate-900"

    return (
        <NavLink to={props.data.route} className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            <div id="link-wrapper-small" className="flex justify-center h-10 w-10 my-1 px-2 py-2 space-x-3 rounded-md hover:bg-slate-100">
                <div id="link-icon-small">
                    {props.data.icon}
                </div>
            </div>
        </NavLink>
    );
}