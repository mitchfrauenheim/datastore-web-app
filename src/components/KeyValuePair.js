export default function KeyValuePair(props) {
    return (
    <div id="key-value" className="flex flex-col">
        <div id="snapshot-id-label" className="text-sm font-medium text-slate-500">
            {props.index}
        </div>
        <div id="snapshot-id-value" className="text-sm text-black">
            {props.value}
        </div>
    </div>
    );
}