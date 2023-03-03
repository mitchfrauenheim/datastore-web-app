import React from "react";

export default function FieldNameTypeTable({ objectWithFields }) {

    return (
        <div className="flex flex-col">
            {objectWithFields.fieldNameTypeStringList?.map((fieldNameTypeString, i) => {
                return (
                    <div key={i}>
                        {fieldNameTypeString.replace(" =>", ":")}
                    </div>
                );
            })}
        </div>
    );
}
