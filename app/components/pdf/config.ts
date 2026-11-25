import { ViewerConfig } from "@embedpdf/viewer-react";

export const config: ViewerConfig = {
    theme: { accent: '#ff8888' },
    features: {
        measurement: false,
        forms: false,
        annotations: false,
        shapes: false,
        insert: false,
    },
    icons: {
        download_: ['M10 14L21 3', 'M21 3l-6.5 18a.5.5 0 0 1-1 0L10 14l-7-3.5a.5.5 0 0 1 0-1L21 3z'],
    },
    commands: [
        {
            id: 'acme:download',
            label: 'Download resume',
            icon: 'download_',
            run: (data: { documentId: string|null }) => console.log("THING: ", data.documentId),
        },
    ],
    layout: (layout: any) =>
        layout
            .add('document:download', {to: 'main', section: 'end'})
            .remove('view:fullscreen', { from: 'document' })
            .remove('document:open', { from: 'document' })
            .remove(['panel:comments', 'menu:outline-item', 'menu:page', 'menu:comment-item', 'menu:view'], {from: 'main'})
            .removeBar(['insert'])
            .add('document:print', { to: 'main', section: 'end' }),
};