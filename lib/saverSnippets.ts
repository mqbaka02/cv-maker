import { buildEducationSnippet, buildExperienceSnippet, buildInfoSnipet, buildLangSnippet, buildSkillsSnippet, buildSummarySnippet, templateMappings } from "@/string_templates/templates";
import { writeIntoFile } from "./writeFile";
import { infoType, langType, singleEducationType, singleExperienceType, singleSkillsetType } from "@/app/types/data";

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

const saveExperiences= async (experiences: singleExperienceType[])=> {
    const latex_snippet= buildExperienceSnippet(experiences);

    return await writeIntoFile(latex_snippet, templateMappings.experience);
};

const saveEducation= async (education: singleEducationType[])=> {
    const latex_snippet= buildEducationSnippet(education);

    return await writeIntoFile(latex_snippet, templateMappings.education);
};

const saveLang= async (languages: langType[])=> {
    const latex_snippet= buildLangSnippet(languages);

    return await writeIntoFile(latex_snippet, templateMappings.lang);
};

export {
    saveInfo,
    saveSummary,
    saveSkills,
    saveExperiences,
    saveEducation,
    saveLang,
};