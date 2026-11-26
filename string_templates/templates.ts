import { infoType, langType, singleEducationType, singleExperienceType, singleSkillsetType } from "@/app/types/data";

const formatIsoDateToSrting= (dateString: string)=> {
    const t= new Date(dateString);
    return t.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
};

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

const buildExperienceSnippet= (experience: singleExperienceType[])=> {
    let snippetString= `

%----------------------%
\\sectionline{Experience}
`;
    experience.forEach(exp=> {
        const startDateString= formatIsoDateToSrting(exp.startDate);
        const endDateString= exp.endDate
            ?exp.isCurrent
                ?'Current'
                :formatIsoDateToSrting(exp.endDate)
            :'Current';
        snippetString+= `
\\subsection*{\\textbf{${exp.positionName}} -- \\textit{${exp.companyName}, ${exp.location.city}, ${exp.location.country}} \\hfill ${startDateString} -- ${endDateString}}
\\begin{itemize}

`;
        exp.descriptions.forEach(desc=> {
            snippetString+= `
    \\item ${desc.mission}
`;
        });
        snippetString+= `
\\end{itemize}

`;
    });

    return snippetString;
};

const buildEducationSnippet= (education: singleEducationType[])=> {
    let snippetString= `

%----------------------%
\\begin{samepage}
    \\sectionline{\\'Education}\\nopagebreak

    `;

    education.forEach(educ=> {
        snippetString+= `
    \\subsection*{\\textbf{${educ.degree}} -- \\textit{${educ.school}, ${educ.location}} \\hfill ${formatIsoDateToSrting(educ.date)}}

        `;
    });

    snippetString+= `
\\end{samepage}
`;

    return snippetString;
};

const buildLangSnippet= (languages: langType[])=> {
    let snippetString= `

%----------------------%
\\sectionline{Languages}
\\begin{itemize}
`;
    languages.forEach(lang=> {
        snippetString+= `
        \\item ${lang.lang} -- ${lang.level.charAt(0).toUpperCase() + lang.level.slice(1)}
`;
    });
    snippetString+= `

\\end{itemize}
`;
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
    buildExperienceSnippet,
    buildEducationSnippet,
    buildLangSnippet,
    templateMappings,
};