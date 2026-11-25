"use client";

import { Input } from "@/untitledui/base/input/input";
import useValues from "../hooks/useValues";
import "@/app/styles.css";
import { PhoneInput } from "@/components/reui/phone-input";
import compileLatex from "@/latex_commands/compile";
import save from "@/latex_commands/save";
import clean from "@/lib/clean";
import { Tabs } from "@/untitledui/application/tabs/tabs";
import { TextArea } from "@/untitledui/base/textarea/textarea";
import { AcademicCapIcon, BriefcaseIcon, FolderOpenIcon, GlobeEuropeAfricaIcon, IdentificationIcon, TrophyIcon, UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Key } from "react-aria-components";
import { useNotifications } from "../context/useNotificationContext";
import { usePdfVersionContext } from "../context/usePdfVersionContext";
import { SetterMap, singleSkillsetType, skillsType, valuesType } from "../types/data";
import TabSwitcher from "./tabs/TabSwitcher";
import { InputTagsOuter } from "@/untitledui/base/input/input-tags-outer";
import { DeleteIcon, TrashIcon } from "lucide-react";


const initialValues: valuesType= {
    firstname: "",
    lastname: "",
    jobTitle: "",
    city: "",
    country: "",
    county: "",
    zipcode: "",
    number1: "",
    number2: "",
    email: "",
    summary: "",
    skillsets: [],
};

const TabLabel= ({text, icon, isActive= false}:{text: string, icon: React.ReactElement, isActive?: boolean})=> {
    return <div className={`items-center sss gap-1 grid ${isActive? 'grid-cols-[auto_1fr]' : 'grid-cols-[auto_0fr]'} transition-all duration-300 overflow-hidden`}>
        {icon}
        <div className="hidden xl:block">{text}</div>
        <div className="block xl:hidden">{isActive && text}</div>
    </div>;
};

const tabs= [
    {id: "thing1", label: <TabLabel text="Basic Info" icon={<IdentificationIcon className="h-5 w-5" />} />, text: "Basic Info", icon: <IdentificationIcon className="h-5 w-5" />},
    {id: "thing3", label: <TabLabel text="Basic Info" icon={<WrenchScrewdriverIcon className="h-5 w-5" />} />, text: "Skills", icon: <WrenchScrewdriverIcon className="h-5 w-5" />},
    {id: "thing2", label: <TabLabel text="Experience" icon={<BriefcaseIcon className="h-5 w-5" />} />, text: "Experience", icon: <BriefcaseIcon className="h-5 w-5" />},
    {id: "thing4", label: <TabLabel text="Education" icon={<AcademicCapIcon className="h-5 w-5" />} />, text: "Education", icon: <AcademicCapIcon className="h-5 w-5" />},
    {id: "thing5", label: <TabLabel text="Languages" icon={<GlobeEuropeAfricaIcon className="h-5 w-5" />} />, text: "Languages", icon: <GlobeEuropeAfricaIcon className="h-5 w-5" />},
    {id: "thing6", label: <TabLabel text="Portfolio" icon={<FolderOpenIcon className="h-5 w-5" />} />, text: "Portfolio", icon: <FolderOpenIcon className="h-5 w-5" />},
    {id: "thing7", label: <TabLabel text="References" icon={<UsersIcon className="h-5 w-5" />} />, text: "References", icon: <UsersIcon className="h-5 w-5" />},
    {id: "thing8", label: <TabLabel text="Others" icon={<TrophyIcon className="h-5 w-5" />} />, text: "Others", icon: <TrophyIcon className="h-5 w-5" />},
];

type TabType= typeof tabs[number];

export default function MainForm() {

    const { values, setter } = useValues(initialValues, {useDraft: true, storageName:"TempData"});

    const {addNotification}= useNotifications();
    
    const {refreshPDF}= usePdfVersionContext();

    const compile = async () => {
        const result = await compileLatex("./latex/resume.tex");
        if (result.success) {
            addNotification({
                title: "Done",
                message: "The latex file has been compiled successfully.",
                type: "success",
                duration: 5_000
            });
            refreshPDF();
        } else {
            console.error("Compilation failed:", result.message);
            addNotification({
                title: "Error",
                message: "Compilation failed:" + result.message,
                type: "error",
                duration: 5_000
            });
        }
    };
    const cleanOutput = async () => {
        const result = await clean();
        if (result.success) {
            addNotification({
                title: "Done",
                message: "The latex outputs have been cleaned successfully.",
                type: "success",
                duration: 5_000
            });
        } else {
            console.error("Cleaning failed:", result.message);
            addNotification({
                title: "Error",
                message: "Cleaning failed:" + result.message,
                type: "error",
                duration: 5_000
            });
        }
    };
    const saveValues = async () => {
        console.log(values);
        const result = await save(values);
        if (result.success) {
            addNotification({
                title: "Done",
                message: "The latex file has been saved successfully.",
                type: "success",
                duration: 5_000
            });
        } else {
            console.error("Save failed:", result.message);
            addNotification({
                title: "Error",
                message: "Save failed:" + result.message,
                type: "error",
                duration: 5_000
            });
        }
    };

    const [selectedTabKey, setSelectedTabKey]= useState<Key>("thing1");

    return <div className="w-full flex gap-8 flex-col @container overflow-y-auto relative">
        <div className="flex flex-col gap-6 sticky top-0 bg-white/30 backdrop-blur-sm z-[90] py-2 px-4">
            <div className="flex gap-2">
                <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm" onClick={compile}>Compile</button>
                <button className="bg-green-500 text-black active:bg-red-500 p-1 px-2 rounded-sm" onClick={saveValues}>Save</button>
                <button className="active:bg-white text-black bg-red-500 p-1 px-2 rounded-sm" onClick={cleanOutput}>Clean</button>
            </div>
            
            <Tabs selectedKey={selectedTabKey} onSelectionChange={setSelectedTabKey} className={"overflow-parent"}>
                <Tabs.List type="button-border" items={tabs} className={"w-full overflow-x-auto overflow-indicator"}>
                    {
                        (tab)=> <Tabs.Item id={tab.id}>
                            {
                            ({isSelected})=> 
                                <TabLabel text={(tab as unknown as TabType).text} icon={(tab as unknown as TabType).icon} isActive={isSelected} />
                            }
                        </Tabs.Item>
                    }
                </Tabs.List>
            </Tabs>
        </div>
        <TabSwitcher
            activeKey={selectedTabKey}
            tabContents={[
                {element: <BasicInfoForm values={values} setter={setter}/>, key:"thing1"},
                {element: <SkillsForm values={values} setter={setter}/>, key:"thing3"},
                {element: <ExperienceForm values={values} setter={setter}/>, key:"thing2"},
                {element: <EducationForm values={values} setter={setter}/>, key:"thing4"},
                {element: <LangForm values={values} setter={setter}/>, key:"thing5"},
                {element: <PortfolioForm values={values} setter={setter}/>, key:"thing6"},
                {element: <ReferencesForm values={values} setter={setter}/>, key:"thing7"},
                {element: <OthersForm values={values} setter={setter}/>, key:"thing8"},
            ]}
        />
    </div>;
};

const BasicInfoForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Basic Info" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="Job Title" value={values.jobTitle} onChange={setter["jobTitle"]} name="jobTitle" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="Country" value={values.country} onChange={setter["country"]} name="country" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="Current City" value={values.city} onChange={setter["city"]} name="city" size="sm" />
            <Input label="County" value={values.county} onChange={setter["county"]} name="county" size="sm" />
            <Input label="Postal code" value={values.zipcode} onChange={setter["zipcode"]} name="zipcode" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1 items-stretch">
            <Input label="Email" value={values.email} onChange={setter["email"]} name="email" className={"flex-1/3"} size="sm" />
            <div className="flex-col gap-1 flex h-full justify-between">
                <label htmlFor="phone1" className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary">Primary Phone Number</label>
                <PhoneInput
                    value={values.number1}
                    onChange={setter["number1"]}
                    id="phone1"
                    name="phone1"
                    variant="lg"
                />
            </div>
            <div className="flex-col gap-1 flex h-full justify-between">
                <label htmlFor="phone2" className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary">Secondary Phone Number</label>
                <PhoneInput
                    value={values.number2}
                    onChange={setter["number2"]}
                    id="phone2"
                    name="phone2"
                    variant="lg"
                />
            </div>
        </div>
        <TextArea rows={5} value={values.summary} onChange={setter["summary"]} label="Summary" placeholder="Describe yourself in a paragraph" />
    </div>;
};

const SkillsForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {
    const addSkillSet= ()=> {
        const newSkillsets= [...values.skillsets];
        newSkillsets.push({
            skills: [],
            skillsetName: "",
            key: String(Date.now()),
        });
        setter["skillsets"](newSkillsets);
    };

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Skills" />
        <div className="flex flex-col gap-4">
            {
                values.skillsets.map(s=>
                    <SingleSkillsetForm skills={s.skills} skillset={s.skillsetName} setter={setter} currentSkillsets={values.skillsets} key={s.key} />
                )
            }
            <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm" onClick={addSkillSet}>+ Add Skillset</button>
        </div>
    </div>;
};

const SingleSkillsetForm= ({skills, skillset, setter, currentSkillsets}: {skills: string[], skillset: string, setter: SetterMap<valuesType>, currentSkillsets: singleSkillsetType[]})=> {
    const onSkillSetNameChange= (value: string)=> {
        // const st= setter["skillsets"];
        const newSkillsets= currentSkillsets.map(s=>
            s.skillsetName===skillset ?
            {...s, skillsetName: value}
            : s
        );
        setter["skillsets"](newSkillsets);
        console.log(value);
    };
    const onSkillChange= (value: string[])=> {
        const newSkillsets= currentSkillsets.map(s=>
            s.skillsetName===skillset ?
            {...s, skills: value}
            : s
        );
        setter["skillsets"](newSkillsets);
    };
    const deleteSkillSet= ()=> {
        const newSkillsets= currentSkillsets.filter(s=> s.skillsetName!== skillset);
        setter["skillsets"](newSkillsets);
    };
    return <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
            <Input label="Skillset Name" value={skillset} placeholder="Enter skillset name" onChange={onSkillSetNameChange} className={"grow w-full"}/>
            <button className="active:bg-white text-black bg-red-500 p-2 px-2 rounded-sm self-start cursor-pointer" onClick={deleteSkillSet}><TrashIcon className="w-5 h-5" /></button>
        </div>
        <InputTagsOuter label="Skills" value={skills} onChange={onSkillChange} placeholder="Enter a skill" />
    </div>;
};


const ExperienceForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Experience" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};
const EducationForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Education" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};
const LangForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Languages" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};
const PortfolioForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Portfolio" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};
const ReferencesForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="References" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};
const OthersForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Others" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};

const TabTitle= ({title}: {title: string})=> {
    return <div className="flex gap-2 items-center">
        <h2 className="text-2xl font-semibold w-max shrink-0 text-black/80">{title}</h2>
        <div className="h-[2px] w-full grow-1 bg-black/80"></div>
    </div>;
};