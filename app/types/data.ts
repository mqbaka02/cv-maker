type infoType= {
    firstname: string;
    lastname: string;
    jobTitle: string;
    country: string;
    city: string;
    county: string;
    zipcode: string;
    number1?: string;
    number2?: string;
    email: string;
};

type summaryType= {
    summary: string
};

type singleSkillsetType= {
    key: string,
    skillsetName: string,
    skills: string[],
};

type skillsType= {
    skillsets: singleSkillsetType[];
};

type singleExperienceType= {
    key: string,
    positionName: string,
    companyName: string,
    location: {
        city: string,
        country: string,
    },
    startDate: string,
    endDate?: string,
    descriptions: {key: string, mission: string}[],
    isCurrent: boolean,
};

type experienceType= {
    experiences: singleExperienceType[],
};

type singleEducationType= {
    key: string,
    degree: string,
    school: string,
    location: string,
    date: string,
};

type educationType= {
    education: singleEducationType[],
};

type langType= {
    key: string,
    lang: string,
    level: "beginner"| "intermediate"| "fluent"| "native/bilingual",
};

type languages= {
    languages: langType[],
};

type valuesType= infoType
& summaryType
& skillsType
& experienceType
& educationType
& languages
& {};

type SetterMap<T> = {
    [K in keyof T]: (value: T[K]) => void;
};


export type {
    valuesType,
    infoType,
    SetterMap,
    singleSkillsetType,
    skillsType,
    singleExperienceType,
    experienceType,
    singleEducationType,
    educationType,
    langType,
    summaryType,
}