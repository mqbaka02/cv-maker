import { buildInfoSnipet, templateMappings } from "@/string_templates/templates";
import { writeIntoFile } from "./writeFile";
import { infoType } from "@/app/types/data";

const saveInfo= async (info: infoType)=> {
    const latex_snippet= buildInfoSnipet(info);

    return await writeIntoFile(latex_snippet, templateMappings.info);
};


export {
    saveInfo,
};