import { buildInfoSnipet, buildSummarySnippet, templateMappings } from "@/string_templates/templates";
import { writeIntoFile } from "./writeFile";
import { infoType } from "@/app/types/data";

const saveInfo= async (info: infoType)=> {
    const latex_snippet= buildInfoSnipet(info);

    return await writeIntoFile(latex_snippet, templateMappings.info);
};

const saveSummary= async (summary: string)=> {
    const latex_snippet= buildSummarySnippet(summary);

    return await writeIntoFile(latex_snippet, templateMappings.summary);
};


export {
    saveInfo,
    saveSummary,
};