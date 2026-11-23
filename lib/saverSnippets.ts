import { buildInfoSnipet, templateMappings } from "@/string_templates/templates";
import { writeIntoFile } from "./writeFile";

const saveInfo= async (
    firstname: string,
    lastname: string,
)=> {
    const latex_snippet= buildInfoSnipet(firstname, lastname);

    return await writeIntoFile(latex_snippet, templateMappings.info);
};


export {
    saveInfo,
};