import "@/app/styles.css";
import { SetterMap, valuesType } from "@/app/types/data";
import { PhoneInput } from "@/components/reui/phone-input";
import { Input } from "@/untitledui/base/input/input";
import { TextArea } from "@/untitledui/base/textarea/textarea";
import TabTitle from "./TabTitle";


const BasicInfoForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Basic Info" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="Job Title" value={values.jobTitle} onChange={setter["jobTitle"]} name="jobTitle" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="Country" value={values.country} onChange={setter["country"]} name="country" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="Current City" value={values.city} onChange={setter["city"]} name="city" size="sm" />
            <Input label="County" value={values.county} onChange={setter["county"]} name="county" size="sm" />
            <Input label="Postal code" value={values.zipcode} onChange={setter["zipcode"]} name="zipcode" size="sm" />
        </div>
        <div className="flex flex-col @2xl:flex-row gap-1 items-stretch">
            <Input label="Email" value={values.email} onChange={setter["email"]} name="email" className={"flex-1/3"} size="sm" />
            <div className="flex-col gap-1 flex h-full justify-between">
                <label htmlFor="phone1" className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary">Primary Phone Number</label>
                <PhoneInput
                    value={values.number1}
                    onChange={setter["number1"]}
                    id="phone1"
                    name="phone1"
                    variant="lg"
                />
            </div>
            <div className="flex-col gap-1 flex h-full justify-between">
                <label htmlFor="phone2" className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary">Secondary Phone Number</label>
                <PhoneInput
                    value={values.number2}
                    onChange={setter["number2"]}
                    id="phone2"
                    name="phone2"
                    variant="lg"
                />
            </div>
        </div>
        <TextArea rows={5} value={values.summary} onChange={setter["summary"]} label="Summary" placeholder="Describe yourself in a paragraph" />
    </div>;
};

export default BasicInfoForm;