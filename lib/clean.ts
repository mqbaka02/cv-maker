"use server";

import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync= promisify(exec);

export default async function clean() {
    
    try{
        const {stdout, stderr}= await execAsync("rm ./latex_output/*");
        console.log("Cleaned!");
        return {success: true, message: "Everything Cool!"};
    } catch (error: any) {
        console.error('Cleaning failed:\n', error.stdout || error.message || error);
        return {success: false, message: "Everything NOT Cool: " + (error.stdout || error.message || error)};
  }
};