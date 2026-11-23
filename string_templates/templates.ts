const buildInfoSnipet= (
    firstname: string,
    lastname: string
)=> {
    return `
%----------------------%
% Title & Contact Info
%----------------------%
\\begin{center}
    {\\LARGE \\textbf{${firstname} ${lastname}}} \\\\[6pt]
    {\\Large{JobTitle/Position}}\\\\
    County City, Country PostalCode \\\\
    +xxx xx xx xxx xx | +xxx xx xx xxx xx \\\\
    \\href{mailto:email@domain.com}{email@domain.com} \\\\[6pt]
    \\rule{\\textwidth}{0.4pt} % horizontal separation line
\\end{center}
    `;
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
    templateMappings,
};