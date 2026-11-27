"use client";

import "@/app/styles.css";
import compileLatex from "@/latex_commands/compile";
import save from "@/latex_commands/save";
import clean from "@/lib/clean";
import { Tabs } from "@/untitledui/application/tabs/tabs";
import { AcademicCapIcon, BriefcaseIcon, DocumentIcon, FolderOpenIcon, GlobeEuropeAfricaIcon, IdentificationIcon, TrophyIcon, UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Key } from "react-aria-components";
import { useNotifications } from "../context/useNotificationContext";
import { usePdfVersionContext } from "../context/usePdfVersionContext";
import useValues from "../hooks/useValues";
import { valuesType } from "../types/data";
import BasicInfoForm from "./subforms/BasicInfoForm";
import EducationForm from "./subforms/EducationForm";
import ExperienceForm from "./subforms/ExperienceForm";
import LangForm from "./subforms/LangForm";
import OthersForm from "./subforms/OthersForm";
import PortfolioForm from "./subforms/PortfolioForm";
import ReferencesForm from "./subforms/ReferencesForm";
import SkillsForm from "./subforms/SkillsForm";
import TabSwitcher from "./tabs/TabSwitcher";
import useFloatingPdfContext from "../context/useFloatingPdfViewer";


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
    experiences: [],
    education: [],
    languages: [],
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
        const result = await compileLatex();
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

    useEffect(()=> {
        (async function initSession () {
            await fetch("/api/public_session/");
        }) ();
    }, []);

    const [selectedTabKey, setSelectedTabKey]= useState<Key>("thing1");
    const {setOn}= useFloatingPdfContext();
    const displayDocument= ()=> {
        setOn(true);
    };

    return <div className="w-full flex gap-8 flex-col @container overflow-y-auto relative h-full row-start-1 col-start-1">
        <div className="flex flex-col gap-6 bg-white/30 backdrop-blur-sm z-[90] py-2 px-4 grow-0 shadow-sm">
            <div className="flex gap-2">
                <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm" onClick={compile}>Compile</button>
                <button className="bg-green-500 text-black active:bg-red-500 p-1 px-2 rounded-sm" onClick={saveValues}>Save</button>
                <button className="active:bg-white text-black bg-red-500 p-1 px-2 rounded-sm" onClick={cleanOutput}>Clean</button>
                <button className="active:bg-red text-black bg-white border border-black p-1 px-2 rounded-sm lg:hidden block" onClick={displayDocument}><DocumentIcon className="w-6 h-6" /></button>
            </div>
            
            <Tabs selectedKey={selectedTabKey} onSelectionChange={setSelectedTabKey} className={"overflow-parent grow-0"}>
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
        <div className="h-full overflow-y-auto">
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
        </div>
    </div>;
};
