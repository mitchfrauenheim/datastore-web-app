export default function NanosTimestampCellRenderer(props) {
    return (
        <div className="flex flex-col">
            <div>
                {props.value.timestampLocaleString}
            </div>
            <div>
                Nanos: {props.value.timestampNanos}
            </div>
        </div>
    )
}