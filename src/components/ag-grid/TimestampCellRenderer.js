export default function TimestampCellRenderer(props) {
    if (props.value.splitLines) {
        const date = props.value.timestamp.substring(0, 10)
        const time = props.value.timestamp.substring(11,23)
        return (
            <div className="flex flex-col">
                <div>
                    {time},
                </div>
                <div>
                    {date}
                </div>
            </div>
        );
    }
    return (
        props.value.timestamp
    )
}