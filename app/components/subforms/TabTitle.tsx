
const TabTitle= ({title, icon}: {title: string, icon: React.ReactNode})=> {
    return <div className="flex gap-2 items-center">
        {icon}
        <h2 className="text-2xl font-semibold w-max shrink-0 text-black/80">{title}</h2>
        <div className="h-[2px] w-full grow-1 bg-black/80"></div>
    </div>;
};

export default TabTitle;