import { useCallback } from "react";

export default function PageSizeSelector(props) {

    const onPageSizeChanged = useCallback(() => {
        let value = document.getElementById('pv-page-size').value;
        props.gridRef.current.api.paginationSetPageSize(Number(value));
        props.setSelected(value);
    }, []);

    return (
        <div className="h-6 font-medium text-slate-800">
            Page Size:
            <select onChange={onPageSizeChanged}
                id="pv-page-size"
                value={props.selected}
                className="ml-2 rounded focus:outline-0 border border-gray-300">
                {props.options.map((option) => {
                    return (
                        <option value={option}>{option}</option>
                    )
                })}
            </select>
        </div>
    )
}