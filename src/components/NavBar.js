export default function NavBar(props) {
    return (
        <div id="main-header" className="flex items-end h-24 border-b-2 border-black border-opacity-5">
        <div id="main-header-content" className="flex ml-6 mb-6 w-11/12">
            <div id="page-title" className="text-2xl font-semibold">
                {props.pageName}
            </div>
        </div>
    </div>
    );
}