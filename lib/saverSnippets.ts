import { buildEducationSnippet, buildExperienceSnippet, buildInfoSnipet, buildLangSnippet, buildSkillsSnippet, buildSummarySnippet, templateMappings } from "@/string_templates/templates";
import { writeIntoFile } from "./writeFile";
import { infoType, langType, singleEducationType, singleExperienceType, singleSkillsetType } from "@/app/types/data";
import { cookies } from "next/headers";

const getSessionId= async ()=> {
    const cookieStore= await cookies();

    const sessionId= cookieStore.get("public_session_id")?.value;
    if (!sessionId) throw new Error("Missing cookie");

    return sessionId;
};

const saveInfo= async (info: infoType)=> {
    const sessionId= await getSessionId();
    const latex_snippet= buildInfoSnipet(info);

    return await writeIntoFile(latex_snippet, `workspaces/${sessionId}${templateMappings.info}`);
};

const saveSummary= async (summary: string)=> {
    const sessionId= await getSessionId();
    const latex_snippet= buildSummarySnippet(summary);

    return await writeIntoFile(latex_snippet, `workspaces/${sessionId}${templateMappings.summary}`);
};

const saveSkills= async (skillsets: singleSkillsetType[])=> {
    const sessionId= await getSessionId();
    const latex_snippet= buildSkillsSnippet(skillsets);

    return await writeIntoFile(latex_snippet, `workspaces/${sessionId}${templateMappings.skills}`);
};

const saveExperiences= async (experiences: singleExperienceType[])=> {
    const sessionId= await getSessionId();
    const latex_snippet= buildExperienceSnippet(experiences);

    return await writeIntoFile(latex_snippet, `workspaces/${sessionId}${templateMappings.experience}`);
};

const saveEducation= async (education: singleEducationType[])=> {
    const sessionId= await getSessionId();
    const latex_snippet= buildEducationSnippet(education);

    return await writeIntoFile(latex_snippet, `workspaces/${sessionId}${templateMappings.education}`);
};

const saveLang= async (languages: langType[])=> {
    const sessionId= await getSessionId();
    const latex_snippet= buildLangSnippet(languages);

    return await writeIntoFile(latex_snippet, `workspaces/${sessionId}${templateMappings.lang}`);
};

export {
    saveInfo,
    saveSummary,
    saveSkills,
    saveExperiences,
    saveEducation,
    saveLang,
};