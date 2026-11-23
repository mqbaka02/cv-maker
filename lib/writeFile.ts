import { writeFile } from "node:fs/promises";

/**
 * Writes some text into a file
 * @param content The string to write in
 * @param filepath The file path relative to app rootfolder
 * @returns 
 */
const writeIntoFile= async (content: string, filepath: string)=> {
    try {
        await writeFile(filepath, content);
        return {success: true, message: `Content written in "${filepath}" successfully.`};
    } catch (err: any) {
        console.log("Errror: ", `Error writing in "${filepath}"; ${err.message || err}`)
    }
};

export {
    writeIntoFile
};