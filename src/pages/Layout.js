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
                        <Link to="/snapshotList">Explore Snapshots</Link>
                    </li>
                    <li>
                        <Link to="/pvList">Explore PVs</Link>
                    </li>
                    <li>
                        <Link to="/annotationList">Explore Annotations</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;