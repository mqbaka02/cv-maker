import { SetterMap } from "@/app/types/data";
import React from "react";
import { Key } from "react-aria-components";
import TabTitle from "./TabTitle";

function ExtensibleFormArray<T extends {key: Key}, S> ({addOne, title, SingleForm, values, addText, setter}: {
    addOne: ()=> void,
    title: string,
    SingleForm: React.FC<{setter: SetterMap<S>, value: T, currentValues: T[]}>,
    values: T[],
    addText: string,
    setter: SetterMap<S>
}) {
    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title={title} />
        <div className="flex flex-col gap-4">
            {
                values.map((s, i)=>
                    <React.Fragment key={s.key} >
                        {i> 0 && <hr />}
                        <SingleForm value={s} setter={setter} currentValues={values} />
                    </React.Fragment>
                )
            }
            <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm" onClick={addOne}>+ {addText}</button>
        </div>
    </div>;
};

export default ExtensibleFormArray;