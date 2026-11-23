"use server";

import { valuesType } from "@/app/types/data";
import { saveInfo } from "@/lib/saverSnippets";

export default async function save(data: valuesType) {
    
    try{
        await saveInfo(data);

        return {success: true, message: "Info have been saved!"};
    } catch (error: any) {
        // console.error('Cleaning failed:\n', error.stdout || error.message || error);
        return {success: false, message: "Everything NOT Cool: " + (error.stdout || error.message || error)};
  }
};