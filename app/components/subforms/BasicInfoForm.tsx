import "@/app/styles.css";
import { SetterMap, valuesType } from "@/app/types/data";
import { PhoneInput } from "@/components/reui/phone-input";
import { Input } from "@/untitledui/base/input/input";
import { TextArea } from "@/untitledui/base/textarea/textarea";
import TabTitle from "./TabTitle";
import LabelAndField from "./LabelAndField";
import { IdentificationIcon } from "@heroicons/react/24/outline";


const BasicInfoForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Basic Info" icon={<IdentificationIcon className="w-10 h-10" />} />
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
            <LabelAndField
                label="Primary Phone Number"
                identifier="phone1"
            >
                <PhoneInput
                    value={values.number1}
                    onChange={setter["number1"]}
                    id="phone1"
                    name="phone1"
                    variant="lg"
                />
            </LabelAndField>
            <LabelAndField
                label="Secondary Phone Number"
                identifier="phone2"
            >
                <PhoneInput
                    value={values.number2}
                    onChange={setter["number2"]}
                    id="phone2"
                    name="phone2"
                    variant="lg"
                />
            </LabelAndField>
        </div>
        <TextArea rows={5} value={values.summary} onChange={setter["summary"]} label="Summary" placeholder="Describe yourself in a paragraph" />
    </div>;
};


export default BasicInfoForm;