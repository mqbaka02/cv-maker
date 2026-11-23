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

type valuesType= infoType
& {};


export type {
    valuesType,
    infoType,
}