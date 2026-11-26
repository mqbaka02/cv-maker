import "@/app/styles.css";
import { SetterMap, singleExperienceType, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import ExtensibleFormArray from "./ExtensibleFormArray";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DatePicker } from "@/untitledui/application/date-picker/date-picker";



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
    const onJobChange= (v: string)=> {};
    const onCompanyChange= (v: string)=> {};
    const onCityChange= (v: string)=> {};
    const onCountryChange= (v: string)=> {};
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
            <Input label="Start Date" value={value.startDate} placeholder="City" onChange={onCityChange} className={"grow w-full"}/>
            <DatePicker />
            <Input label="End Date" value={value.endDate} placeholder="Country" onChange={onCountryChange} className={"grow w-full"}/>
        </div>
    </div>;
};

export default ExperienceForm;