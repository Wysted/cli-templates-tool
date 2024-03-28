import { execSync } from "child_process";

const runCommand = async (command) => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

export default runCommand;
