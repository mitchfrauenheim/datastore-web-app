import React from "react";

export default function AttributePairsTable({ objectWithAttributes }) {

    return (
        <div classname="flex flex-col">
            {objectWithAttributes.attributePairStrings?.map((pairString, i) => {
                console.log(objectWithAttributes)
                return (
                    <div key={i}>
                            {pairString.replace(" =>", ":")}
                    </div>
                );
            })}
        </div>
    );
}
