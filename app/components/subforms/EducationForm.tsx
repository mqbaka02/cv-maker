import "@/app/styles.css";
import { SetterMap, singleEducationType, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import ExtensibleFormArray from "./ExtensibleFormArray";
import LabelAndField from "./LabelAndField";
import { DatePicker } from "@/untitledui/application/date-picker/date-picker";
import { useState } from "react";
import { DateValue } from "react-aria-components";
import { TrashIcon } from "@heroicons/react/24/outline";
import { parseDate } from "@internationalized/date";


const EducationForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    const addEducation= ()=> {
        const newEducation= [...values.education];
        newEducation.push({
            key: String(Date.now()),
            date: "",
            degree: "",
            location: "",
            school: "",
        });
        setter["education"](newEducation);
    };

    return <ExtensibleFormArray
        addOne={addEducation}
        title="Education"
        SingleForm={SingleEducationForm}
        values={values.education}
        addText="Add Education"
        setter={setter}
    />;
};

const SingleEducationForm= ({value, setter, currentValues}: {
    value: singleEducationType,
    setter: SetterMap<valuesType>,
    currentValues: singleEducationType[]
})=> {
    const educChangeGeneric= (v: string, prop: keyof singleEducationType)=> {
        const newEduc= currentValues.map(exp=>
            exp.key===value.key?
            {...exp, [prop]: v}:
            exp
        );
        setter["education"](newEduc);
    };
    const onShcoolChange= (v: string)=> {
        educChangeGeneric(v, "school");
    };
    const onDegreeChange= (v: string)=> {
        educChangeGeneric(v, "degree");
    };
    const onLocationChange= (v: string)=> {
        educChangeGeneric(v, "location");
    };

    const [date, setDate]= useState<DateValue|null>(value.date? parseDate(value.date): null);
    
    const onDateChange= (v: DateValue|null)=> {
        setDate(v);
        educChangeGeneric(v?.toString()|| "", "date");
    };

    const deleteThisEduc= ()=> {
        const newEduc= currentValues.filter(educ=>
            educ.key!== value.key
        );
        setter["education"](newEduc);
    };

    return <div className="flex flex-col gap-2">
        <div className="flex flex-col @2xl:flex-row gap-2">
            <Input label="Degree" value={value.degree} onChange={onDegreeChange} className={"grow w-full"} />
            <LabelAndField label="Graduation Date" identifier="date" >
                <DatePicker name="date" id="date" value={date} onChange={onDateChange} />
            </LabelAndField>
            <button className="active:bg-white text-black bg-red-500 p-2 px-2 rounded-sm self-start cursor-pointer" onClick={deleteThisEduc}><TrashIcon className="w-5 h-5" /></button>
        </div>
        <Input label="School/Institution Name" value={value.school} onChange={onShcoolChange} className={"grow w-full"} />
        <Input label="Location" value={value.location} onChange={onLocationChange} className={"grow w-full"} />
    </div>;
};

export default EducationForm;