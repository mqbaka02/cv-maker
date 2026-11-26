import "@/app/styles.css";
import { SetterMap, singleSkillsetType, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import { InputTagsOuter } from "@/untitledui/base/input/input-tags-outer";
import { TrashIcon } from "lucide-react";
import ExtensibleFormArray from "./ExtensibleFormArray";


const SkillsForm = ({values, setter}: {
    values: valuesType,
    setter: SetterMap<valuesType>
}) => {
    const addSkillSet= ()=> {
        const newSkillsets= [...values.skillsets];
        newSkillsets.push({
            skills: [],
            skillsetName: "",
            key: String(Date.now()),
        });
        setter["skillsets"](newSkillsets);
    };

    return <ExtensibleFormArray
        addOne={addSkillSet}
        title="Skills"
        SingleForm={SingleSkillsetForm}
        values={values.skillsets}
        addText="Add Skillset"
        setter={setter}
    />;
};

const SingleSkillsetForm= ({value, setter, currentValues}: {
    value: singleSkillsetType,
    setter: SetterMap<valuesType>,
    currentValues: singleSkillsetType[]
})=> {
    const onSkillSetNameChange= (v: string)=> {
        const newSkillsets= currentValues.map(s=>
            s.key===value.key ?
            {...s, skillsetName: v}
            : s
        );
        setter["skillsets"](newSkillsets);
        console.log(v);
    };
    const onSkillChange= (v: string[])=> {
        const newSkillsets= currentValues.map(s=>
            s.key===value.key ?
            {...s, skills: v}
            : s
        );
        setter["skillsets"](newSkillsets);
    };
    const deleteThisSkillSet= ()=> {
        const newSkillsets= currentValues.filter(s=> s.key!== value.key);
        setter["skillsets"](newSkillsets);
    };
    return <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
            <Input label="Skillset Name" value={value.skillsetName} placeholder="Enter skillset name" onChange={onSkillSetNameChange} className={"grow w-full"}/>
            <button className="active:bg-white text-black bg-red-500 p-2 px-2 rounded-sm self-start cursor-pointer" onClick={deleteThisSkillSet}><TrashIcon className="w-5 h-5" /></button>
        </div>
        <InputTagsOuter label="Skills" value={value.skills} onChange={onSkillChange} placeholder="Enter a skill" />
    </div>;
};

export default SkillsForm;