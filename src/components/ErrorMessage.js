export default function ErrorMessage(props) {
    return (
        <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-slate-800">
            Unable to complete query
        </h1>
        <p className="text-md text-slate-800">
            {props.errorMsg}
        </p>
    </div>
    )
}