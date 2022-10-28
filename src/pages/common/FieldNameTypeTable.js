import React from "react";

export default function FieldNameTypeTable({ objectWithFields }) {

    return (
        <table className="table-without-border">
            <tbody>
            {objectWithFields.fieldNameTypeStringList?.map((fieldNameTypeString, i) => {
                return (
                    <tr key={i}>
                        <td>
                            {fieldNameTypeString}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
