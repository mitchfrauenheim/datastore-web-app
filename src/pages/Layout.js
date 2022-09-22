import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/explore">Explore Snapshots</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;