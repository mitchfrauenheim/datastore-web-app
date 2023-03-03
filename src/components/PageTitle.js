export default function PageTitle(props) {
    return (
        <div id="main-header" className="flex items-center h-16 flex-shrink-0">
            <div id="main-header-content" className="flex flex-row justify-between w-full">
                <h1 id="snapshot-title" className="text-xl text-slate-800 font-bold">
                    {props.pageName}
                </h1>
            </div>
        </div>
    )
}