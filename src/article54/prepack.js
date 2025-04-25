import * as fs from "node:fs";

function list(dir = "./dist") {
    let ret = [];
    fs.readdirSync(dir).forEach(file => {
        if (fs.statSync(`${dir}/${file}`).isDirectory()) ret.push(...list(`${dir}/${file}`));
        else ret.push(`${dir}/${file}`);
    });
    return ret;
}

list().forEach(file => fs.writeFileSync(file, fs.readFileSync(file, {encoding: "utf8"}).replaceAll("../../_virtual/_plugin-vue_export-helper.js", "_virtual/_plugin-vue_export-helper.js"), {encoding: "utf8"}));