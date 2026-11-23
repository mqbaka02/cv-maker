"use server";

import { saveInfo } from "@/lib/saverSnippets";

type dataType= {
    firstname: string,
    lastname: string,
};

export default async function save(data: dataType) {
    
    try{
        await saveInfo(data.firstname, data.lastname);

        return {success: true, message: "Info have been saved!"};
    } catch (error: any) {
        // console.error('Cleaning failed:\n', error.stdout || error.message || error);
        return {success: false, message: "Everything NOT Cool: " + (error.stdout || error.message || error)};
  }
};