"use server";

import { valuesType } from "@/app/types/data";
import { saveInfo, saveSummary } from "@/lib/saverSnippets";

export default async function save(data: valuesType) {
    
    try{
        await saveInfo(data);
        await saveSummary(data.summary);

        return {success: true, message: "Info have been saved!"};
    } catch (error: any) {
        // console.error('Cleaning failed:\n', error.stdout || error.message || error);
        return {success: false, message: "Error while saving: " + (error.stdout || error.message || error)};
  }
};