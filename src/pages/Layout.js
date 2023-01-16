import { Outlet, Link } from "react-router-dom";

const Layout = ({datastoreConfig}) => {
    return (
        <>
            <nav style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                <ul>
                    <li>
                        <Link to="/">Data Explorer Home</Link>
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
                <p><i>Datastore configuration: {datastoreConfig}</i></p>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;