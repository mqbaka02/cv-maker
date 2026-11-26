import "@/app/styles.css";
import { SetterMap, singleExperienceType, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import ExtensibleFormArray from "./ExtensibleFormArray";



const ExperienceForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    const addExperience= ()=> {};

    return <ExtensibleFormArray
        addOne={addExperience}
        title="Experiences"
        SingleForm={SingleExperienceForm}
        values={values.experiences}
        addText="Add Experience"
        setter={setter}
    />;
};

const SingleExperienceForm= ({value, setter, currentValues}: {
    value: singleExperienceType,
    setter: SetterMap<valuesType>,
    currentValues: singleExperienceType[],
})=> {
    const deleteThisExperience= ()=> {

        const newExperiences= currentValues.filter(s=> s.key!== value.key);
        setter["experiences"](newExperiences);
    };
    return null;
};

export default ExperienceForm;