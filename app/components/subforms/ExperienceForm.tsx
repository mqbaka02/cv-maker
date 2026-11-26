import "@/app/styles.css";
import { SetterMap, singleExperienceType, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import ExtensibleFormArray from "./ExtensibleFormArray";
import { BriefcaseIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DatePicker } from "@/untitledui/application/date-picker/date-picker";
import LabelAndField from "./LabelAndField";
import { Checkbox } from "@/untitledui/base/checkbox/checkbox";
import { useState } from "react";
import { DateValue, Key } from "react-aria-components";
import { parseDate } from "@internationalized/date";



const ExperienceForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    const addExperience= ()=> {
        const newExperiences= [...values.experiences];
        newExperiences.push({
            companyName: "",
            descriptions: [],
            key: String(Date.now()),
            location: {city: "", country: ""},
            positionName: "",
            startDate: "",
            endDate: undefined,
            isCurrent: true,
        });
        setter["experiences"](newExperiences);
    };

    return <ExtensibleFormArray
        addOne={addExperience}
        title="Experiences"
        SingleForm={SingleExperienceForm}
        values={values.experiences}
        addText="Add Experience"
        setter={setter}
        icon={<BriefcaseIcon className="w-10 h-10" />}
    />;
};

const SingleExperienceForm= ({value, setter, currentValues}: {
    value: singleExperienceType,
    setter: SetterMap<valuesType>,
    currentValues: singleExperienceType[],
})=> {
    const deleteThisExperience= ()=> {
        const newExperiences= currentValues.filter(s=> s.key!== value.key);
        setter["experiences"](newExperiences);
    };

    const expChangeGeneric= (v: string, prop: keyof singleExperienceType)=> {
        const newExperiences= currentValues.map(exp=>
            exp.key===value.key?
            {...exp, [prop]: v}:
            exp
        );
        setter["experiences"](newExperiences);
    };

    const onJobChange= (v: string)=> {
        expChangeGeneric(v, "positionName");
    };

    const onCompanyChange= (v: string)=> {
        expChangeGeneric(v, "companyName");
    };

    const onCityChange= (v: string)=> {
        const newExperiences= currentValues.map(exp=>
            exp.key===value.key?
            {...exp, location: {...exp.location, city: v}}:
            exp
        );
        setter["experiences"](newExperiences);
    };

    const onCountryChange= (v: string)=> {
        const newExperiences= currentValues.map(exp=>
            exp.key===value.key?
            {...exp, location: {...exp.location, country: v}}:
            exp
        );
        setter["experiences"](newExperiences);
    };

    const onIsCurrentChange= (v: boolean)=> {
        const allExperiences= currentValues.map(exp=>
            exp.key===value.key?
            {...exp, isCurrent: v}
            :
            exp
        );
        setter["experiences"](allExperiences);
    };

    const addDesc= ()=> {
        const newExperiences= currentValues.map(exp=> {
            if (exp.key!== value.key) return exp;
            const descList= [...exp.descriptions];
            descList.push({
                key: String(Date.now()),
                mission: "",
            });
            return {...exp, descriptions: descList};
        })
        setter["experiences"](newExperiences);
    };

    const deleteDesc= (key: Key)=> {
        const newExperiences= currentValues.map(exp=> {
            if (exp.key!== value.key) return exp;
            const descList= exp.descriptions.filter(desc=> desc.key!== key);
            return {...exp, descriptions: descList};
        })
        setter["experiences"](newExperiences);

    };

    const onEditDesc= (v: string, key: Key)=> {
        const newExperiences= currentValues.map(exp=> {
            if (exp.key!== value.key) return exp;
            const descList= exp.descriptions.map(desc=>
                desc.key=== key?
                {...desc, mission: v}
                : desc
            );
            return {...exp, descriptions: descList};
        })
        setter["experiences"](newExperiences);

    };
    
    const [dates, setDates]= useState<{start: DateValue|null, end: DateValue|null}>({
        start: value.startDate? parseDate(value.startDate): null,
        end : value.endDate? parseDate(value.endDate): null
    });
    const onStartDateChange= (v: DateValue|null)=> {
        setDates((d)=> ({...d, start: v}));
        expChangeGeneric(v?.toString()|| "", "startDate");
    };
    const onEndDateChange= (v: DateValue|null)=> {
        setDates((d)=> ({...d, end: v}));
        expChangeGeneric(v?.toString()|| "", "endDate");
    };

    return <div className="flex flex-col gap-2">
        <div className="flex gap-2">
            <Input label="Position or Job Title" value={value.positionName} placeholder="Job title" onChange={onJobChange} className={"grow w-full"}/>
            <button className="active:bg-white text-black bg-red-500 p-2 px-2 rounded-sm self-start cursor-pointer" onClick={deleteThisExperience}><TrashIcon className="w-5 h-5" /></button>
        </div>
        <Input label="Company Name" value={value.companyName} placeholder="Company name" onChange={onCompanyChange} className={"grow w-full"}/>
        <div className="flex flex-col @2xl:flex-row gap-1 items-stretch">
            <Input label="City" value={value.location.city} placeholder="City" onChange={onCityChange} className={"grow w-full"}/>
            <Input label="Country" value={value.location.country} placeholder="Country" onChange={onCountryChange} className={"grow w-full"}/>
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1 items-stretch">
            <LabelAndField label="Start Date" identifier="startdate">
                <DatePicker size="md" className={"w-full"} value={dates.start} onChange={onStartDateChange} />
            </LabelAndField>
            <div className="w-full self-center">
                <Checkbox label="Current Position" isSelected={value.isCurrent} onChange={onIsCurrentChange} />
            </div>
        </div>
        {
            !value.isCurrent &&
            <LabelAndField label="End Date" identifier="enddate">
                <DatePicker size="md" className={"w-full"} value={dates.end} onChange={onEndDateChange} />
            </LabelAndField>
        }
        <LabelAndField label="Missions" identifier="missions" >
            {
                value.descriptions.map(desc=>
                    <div className="flex gap-2" key={desc.key}>
                        <Input
                            value={desc.mission}
                            onChange={(v: string)=> {onEditDesc(v, desc.key)}}
                            className={"grow w-full"}
                            placeholder="Add a description"
                        />
                        <button
                            className="active:bg-white text-black bg-red-500 p-2 px-2 rounded-sm self-start cursor-pointer"
                            onClick={()=>{deleteDesc(desc.key)}}
                        ><TrashIcon className="w-5 h-5" /></button>
                    </div>
                )
            }
            <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm w-max" onClick={addDesc}>+ Add Description</button>
        </LabelAndField>
    </div>;
};

export default ExperienceForm;