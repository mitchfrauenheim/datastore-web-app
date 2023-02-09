export default function PageTitle(props) {
    return (
        <div id="main-header" className="flex items-center h-16">
            <div id="main-header-content" className="flex w-11/12">
                <div id="page-title" className="text-xl text-slate-800 font-bold">
                    {props.pageName}
                </div>
            </div>
        </div>
    );
}