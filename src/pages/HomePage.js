import PageTitle from "../components/PageTitle";

const HomePage = ({ datastoreConfig }) => {
    return (
        <div id="home-wrapper" className="App page-wrapper">
            <div id="snapshot-breadcrumbs" className="custom-breadcrumbs">
                <ul>
                    <li>Home</li>
                </ul>
            </div>
            <div id="home-content" className="page-content">
                <PageTitle pageName={"Home"} />
                <div id="home-blurb-wrapper" className="page-filter-wrapper">
                    <div id="home-blurb-title" className="flex px-8 font-semibold text-slate-800">
                        Welcome
                    </div>
                    <div className="my-4 border-b border-gray-300"></div>
                    <div id="home-blurb" className="flex flex-col space-y-4 items-start px-8 font-medium text-sm text-slate-800">
                        <div>
                            Welcome to the EPICS Data Explorer. Use the navigation menu to query and
                            filter Snapshots, PVs, and Annotations.
                        </div>
                        <div>
                            Using datastore congfiguration: {datastoreConfig}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;