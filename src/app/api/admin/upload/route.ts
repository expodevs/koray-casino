import { NextResponse } from "next/server";
import {saveFiles} from "@lib/file";


//todo: remove
export async function POST(req: Request) {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.getAll('uploads'));

    const id = formData.get('id');
    const entity = formData.get('entity');
    const pathUploads = `uploads/${entity}/${id}`;
    const results = await saveFiles({folderPath: pathUploads, files: formDataEntryValues});
    return NextResponse.json({ success: true, results });
}
