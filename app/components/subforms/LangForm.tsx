import "@/app/styles.css";
import { SetterMap, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import TabTitle from "./TabTitle";



const LangForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    return <div className="flex flex-col gap-6 py-2 px-4">
        <TabTitle title="Languages" />
        <div className="flex flex-col @2xl:flex-row gap-1">
            <Input label="First name" value={values.firstname} onChange={setter["firstname"]} name="firstname" size="sm" />
            <Input label="Last name" value={values.lastname} onChange={setter["lastname"]} name="lastname" size="sm" />
        </div>
    </div>;
};

export default LangForm;