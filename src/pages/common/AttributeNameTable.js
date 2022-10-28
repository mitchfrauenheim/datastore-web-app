import React from "react";

export default function AttributeNameTable({ objectWithAttributes }) {

    return (
        <table className="table-without-border">
            <tbody>
            {objectWithAttributes.attributeNameList?.map((attributeName, i) => {
                return (
                    <tr key={i}>
                        <td>
                            {attributeName}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
