
const LabelAndField= ({label, identifier, children}: {label: string|React.ReactNode, identifier: string, children: React.ReactNode})=> {
    return <div className="flex-col gap-1 flex h-full justify-between w-full">
        <label htmlFor={identifier} className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary">{label}</label>
        {children}
    </div>;
};

export default LabelAndField;