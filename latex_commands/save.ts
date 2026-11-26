"use server";

import { valuesType } from "@/app/types/data";
import { saveExperiences, saveInfo, saveSkills, saveSummary } from "@/lib/saverSnippets";

export default async function save(data: valuesType) {
    
    try{
        await saveInfo(data);
        await saveSummary(data.summary);
        await saveSkills(data.skillsets);
        await saveExperiences(data.experiences);

        return {success: true, message: "Info have been saved!"};
    } catch (error: any) {
        return {success: false, message: "Error while saving: " + (error.stdout || error.message || error)};
  }
};