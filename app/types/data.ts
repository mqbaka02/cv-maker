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
    summary:string
};

type valuesType= infoType
& summaryType
& {};


export type {
    valuesType,
    infoType,
}