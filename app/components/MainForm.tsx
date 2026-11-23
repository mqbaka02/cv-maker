"use client";

import { Input } from "@/untitledui/base/input/input";
import useValues from "../hooks/useValues";

import compileLatex from "@/latex_commands/compile";
import save from "@/latex_commands/save";
import clean from "@/lib/clean";
import { useNotifications } from "../context/useNotificationContext";

type valuesType= {
    firstname: string;
    lastname: string;
};

const initialValues: valuesType= {
    firstname: "",
    lastname: "",
};

export default function MainForm() {

    const { values, setter } = useValues(initialValues);

    const {addNotification}= useNotifications();

    const compile = async () => {
        const result = await compileLatex("./latex/resume.tex");
        if (result.success) {
            addNotification({
                title: "Done",
                message: "The latex file has been compiled successfully.",
                type: "success",
                duration: 5_000
            });
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

    return <div className="flex gap-1 flex-col">
        <div className="flex gap-2">
            <button className="bg-black text-white active:bg-red-500 p-1 px-2 rounded-sm" onClick={compile}>Compile</button>
            <button className="bg-green-500 text-black active:bg-red-500 p-1 px-2 rounded-sm" onClick={saveValues}>Save</button>
            <button className="active:bg-white text-black bg-red-500 p-1 px-2 rounded-sm" onClick={cleanOutput}>Clean</button>
        </div>
        <div className="flex flex-col md:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" />
        </div>
    </div>;
};