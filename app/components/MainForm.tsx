"use client";

import { Input } from "@/untitledui/base/input/input";
import useValues from "../hooks/useValues";

import { PhoneInput } from "@/components/reui/phone-input";
import compileLatex from "@/latex_commands/compile";
import save from "@/latex_commands/save";
import clean from "@/lib/clean";
import { TextArea } from "@/untitledui/base/textarea/textarea";
import { useNotifications } from "../context/useNotificationContext";
import { valuesType } from "../types/data";
import { usePdfVersionContext } from "../context/usePdfVersionContext";


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
};

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


    return <div className="w-full flex gap-1 flex-col @container">
        <div className="flex gap-2">
            <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm" onClick={compile}>Compile</button>
            <button className="bg-green-500 text-black active:bg-red-500 p-1 px-2 rounded-sm" onClick={saveValues}>Save</button>
            <button className="active:bg-white text-black bg-red-500 p-1 px-2 rounded-sm" onClick={cleanOutput}>Clean</button>
        </div>
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
        <TextArea rows={5} value={values.summary} onChange={setter["summary"]} label="Summary" placeholder="Describe yourself in a paragraph"/>
    </div>;
};