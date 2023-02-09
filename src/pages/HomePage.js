import logo from "../logo.svg";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const HomePage = ({ datastoreConfig }) => {
    return (
        <div className="App">
            <div id="snapshot-breadcrumbs" className="custom-breadcrumbs">
                <ul>
                    <li>Home</li>
                </ul>
            </div>
            <PageTitle pageName={"Home"} />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome to the EPICS Data Explorer.<br />
                    Using Datastore configuration: {datastoreConfig}
                </p>
                <Link className="App-link" to="/snapshotList">explore snapshots</Link>
                <Link className="App-link" to="/pvList">explore PVs</Link>
                <Link className="App-link" to="/annotationList">explore annotations</Link>
            </header>
        </div>
    );
};

export default HomePage;