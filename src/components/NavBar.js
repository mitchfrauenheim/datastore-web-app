export default function NavBar(props) {
    return (
        <div id="main-header" className="flex items-center h-24">
            <div id="main-header-content" className="flex w-11/12">
                <div id="page-title" className="text-xl text-slate-800 font-bold">
                    {props.pageName}
                </div>
            </div>
        </div>
    );
}