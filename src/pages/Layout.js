import { Outlet, Link } from "react-router-dom";
import Menu from "../components/Menu";
// import PageLink from "../components/PageLink"

const Layout = ({ datastoreConfig }) => {
    return (
        <div id="page-wrapper" className="flex flex-row w-screen h-screen overflow-hidden font-inter text-black">
            <Menu />
            <div id="main-wrapper" className="w-full">
                <Outlet />
            </div>
        </div>

    )
};

export default Layout;