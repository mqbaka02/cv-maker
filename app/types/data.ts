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
    descriptions: string[],
};

type experienceType= {
    experiences: singleExperienceType[],
};

type valuesType= infoType
& summaryType
& skillsType
& experienceType
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
    summaryType,
}