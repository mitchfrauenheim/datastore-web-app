import React from "react";

export default function AttributePairsTable({ objectWithAttributes }) {

    return (
        <table className="table-without-border">
            <tbody>
            {objectWithAttributes.attributePairStrings?.map((pairString, i) => {
                return (
                    <tr key={i}>
                        <td>
                            {pairString}
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
