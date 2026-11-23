type infoType= {
    firstname: string;
    lastname: string;
    jobTitle: string;
    country: string;
    city: string;
    county: string;
    zipcode: string;
};

type valuesType= infoType
& {};


export type {
    valuesType,
    infoType,
}