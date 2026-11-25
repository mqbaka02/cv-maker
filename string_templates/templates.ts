import { infoType, singleSkillsetType } from "@/app/types/data";

const buildInfoSnipet= (info: infoType)=> {
    return `

%----------------------%
% Title & Contact Info
%----------------------%
\\begin{center}
    {\\LARGE \\textbf{${info.firstname} ${info.lastname}}} \\\\[6pt]
    {\\Large{${info.jobTitle}}}\\\\
    ${info.county} ${info.city}, ${info.country} ${info.zipcode} \\\\
    ${info.number1 || ''} | ${info.number2 || ''} \\\\
    \\href{mailto:${info.email}}{${info.email}} \\\\[6pt]
    \\rule{\\textwidth}{0.4pt} % horizontal separation line
\\end{center}

    `;
};

const buildSummarySnippet= (summary: string)=> {
    return `

%----------------------%
% Personal Summary (no section title)
%----------------------%
${summary}

    `;
};

const buildSkillsSnippet= (skillsets: singleSkillsetType[])=> {

    let snippetString= `

%----------------------%
\\sectionline{Compétences}
\\begin{itemize}
`;
    skillsets.forEach(skillSet=> {
        snippetString+= `

\\item \\textbf{${skillSet.skillsetName} :} ${skillSet.skills.join(", ")}

`
    });

    snippetString+= "\\end{itemize}";

    return snippetString;
};

//This maps the templates to the files in which they should be written
const templateMappings= {
    info: "./latex/parts/info.tex",
    education: "./latex/parts/education.tex",
    experience: "./latex/parts/experience.tex",
    extra: "./latex/parts/extra.tex",
    lang: "./latex/parts/lang.tex",
    portfolio: "./latex/parts/portfolio.tex",
    ref: "./latex/parts/ref.tex",
    skills: "./latex/parts/skills.tex",
    summary: "./latex/parts/summary.tex",
};

export {
    buildInfoSnipet,
    buildSummarySnippet,
    buildSkillsSnippet,
    templateMappings,
};