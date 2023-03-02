export default function Timestamp(props) {
    if (props.splitLines) {
        const date = props.timestamp.substring(0, 10)
        const time = props.timestamp.substring(11,23)
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
    return(props.timestamp)
}