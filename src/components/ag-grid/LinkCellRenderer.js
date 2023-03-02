import { Link } from "react-router-dom";

export default function LinkCellRenderer(props) {
    return (
        <Link to={props.value.path} >
            {props.value.text || "Error"}
        </Link>
    );
}