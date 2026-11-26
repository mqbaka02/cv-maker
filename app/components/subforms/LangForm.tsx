import "@/app/styles.css";
import { langType, SetterMap, valuesType } from "@/app/types/data";
import { Input } from "@/untitledui/base/input/input";
import { GlobeEuropeAfricaIcon, TrashIcon } from "@heroicons/react/24/outline";
import ExtensibleFormArray from "./ExtensibleFormArray";
import { Select } from "@/untitledui/base/select/select";
import { Key } from "react-aria-components";



const LangForm = ({values, setter}: {values: valuesType, setter: SetterMap<valuesType>}) => {

    const addLang= ()=> {
        const newLanguages= [...values.languages];
        newLanguages.push({
            lang: "",
            level: "beginner",
            key: String(Date.now()),
        });
        setter["languages"](newLanguages);
    };

    return <ExtensibleFormArray
        addOne={addLang}
        title="Languages"
        SingleForm={SingleLangForm}
        values={values.languages}
        addText="Add Language"
        setter={setter}
        icon={<GlobeEuropeAfricaIcon className="w-10 h-10" />}
    />;
};

const SingleLangForm= ({value, currentValues, setter}: {
    value: langType,
    currentValues: langType[],
    setter: SetterMap<valuesType>
})=> {
    const deleteThisLang= ()=> {
        const newValues= currentValues.filter(l=> l.key!== value.key);
        setter["languages"](newValues);
    };
    const onLevelChange= (v: Key|null)=> {
        const newValues= currentValues.map(l=>
            l.key=== value.key?
            {...l, level: v as "beginner"| "intermediate"| "fluent"| "native/bilingual"}
            :
            l
        );
        setter["languages"](newValues);
    };
    const onLangChange= (v: string)=> {
        const newValues= currentValues.map(l=>
            l.key=== value.key?
            {...l, lang: v}
            :
            l
        );
        setter["languages"](newValues);
    };

    return <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 @2xl:flex-row">
            <Input label="Language" placeholder="Ex: English, French, etc..." value={value.lang} onChange={onLangChange} />
            <Select
                label="Level"
                items={[
                    {id: "beginner", label: "Beginner"},
                    {id: "intermediate", label: "Intermediate"},
                    {id: "fluent", label: "Fluent"},
                    {id: "native/bilingual", label: "Native/Bilingual"},
                ]}
                value={value.level}
                onChange={onLevelChange}
            >
                {(item) => (
                    <Select.Item id={item.id}>
                        {item.label}
                    </Select.Item>
                )}
            </Select>
            <button className="active:bg-white text-black bg-red-500 p-2 px-2 rounded-sm self-start cursor-pointer" onClick={deleteThisLang}><TrashIcon className="w-5 h-5" /></button>
        </div>
    </div>;
};

export default LangForm;