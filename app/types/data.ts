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
    skillsetName: string,
    skills: string[],
    key: string,
};

type skillsType= {
    skillsets: singleSkillsetType[];
};

type valuesType= infoType
& summaryType
& skillsType
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
    summaryType,
}