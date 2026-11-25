import { Key } from "react-aria-components";

export default function TabSwitcher({tabContents, activeKey}: {tabContents: {key: Key, element: React.ReactNode}[], activeKey: Key}) {
    return <div className="grid">
        {
            tabContents.map(t=> <div className={`w-full row-start-1 col-start-1 ${activeKey===t.key ? 'z-1 opacity-1000': 'z-0 opacity-0'} transition-opacity duration-300`} key={t.key}>{t.element}</div>)
        }
    </div>;
};