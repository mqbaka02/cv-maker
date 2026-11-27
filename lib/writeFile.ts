import fs, { writeFile } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Writes some text into a file
 * @param content The string to write in
 * @param filepath The file path relative to app rootfolder
 * @returns 
 */
const writeIntoFile= async (content: string, filepath: string)=> {
    try {
        //Create directory if doesn't exist
        await fs.mkdir(dirname(filepath), { recursive: true });

        await writeFile(filepath, content, "utf-8");

        return {success: true, message: `Content written in "${filepath}" successfully.`};
    } catch (err: any) {
        console.log("Errror: ", `Error writing in "${filepath}"; ${err.message || err}`);
        return {success: false, message: err.message || String(err)};
    }
};

export {
    writeIntoFile
};
