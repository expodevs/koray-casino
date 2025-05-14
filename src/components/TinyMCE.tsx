'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
    ssr: false,
});

type TinyMCEProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function TinyMCE({ value, onChange }: TinyMCEProps) {
    return (
        <Editor
            tinymceScriptSrc="/assets/tinymce/tinymce.min.js"
            value={value}
            onEditorChange={onChange}
            init={{
                license_key: 'gpl',
                height: 300,
                menubar: false,
                plugins: 'autosave autoresize preview code searchreplace autolink directionality visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount',
                toolbar1: "undo redo | importword exportword exportpdf | revisionhistory | blocks fontsizeinput | bold italic | align numlist bullist | link image | table math media pageembed | lineheight  outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
        />
    );
}
