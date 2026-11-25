import { buildInfoSnipet, buildSkillsSnippet, buildSummarySnippet, templateMappings } from "@/string_templates/templates";
import { writeIntoFile } from "./writeFile";
import { infoType, singleSkillsetType } from "@/app/types/data";

const saveInfo= async (info: infoType)=> {
    const latex_snippet= buildInfoSnipet(info);

    return await writeIntoFile(latex_snippet, templateMappings.info);
};

const saveSummary= async (summary: string)=> {
    const latex_snippet= buildSummarySnippet(summary);

    return await writeIntoFile(latex_snippet, templateMappings.summary);
};

const saveSkills= async (skillsets: singleSkillsetType[])=> {
    const latex_snippet= buildSkillsSnippet(skillsets);

    return await writeIntoFile(latex_snippet, templateMappings.skills);
};

export {
    saveInfo,
    saveSummary,
    saveSkills,
};