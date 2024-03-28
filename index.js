#!/usr/bin/env node
import InstallTemplate from "./modules/installTemplate.js";

const template = new InstallTemplate();

const process = async () => {
    try {
        await template.promptQuestions();
    } catch (e) {
        console.error(e);
    }
};

process();
