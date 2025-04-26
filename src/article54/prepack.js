import * as fs from "node:fs";

function list(dir = "./dist") {
    let ret = [];
    fs.readdirSync(dir).forEach(file => {
        if (fs.statSync(`${dir}/${file}`).isDirectory()) ret.push(...list(`${dir}/${file}`));
        else ret.push(`${dir}/${file}`);
    });
    return ret;
}

const primevueDirs = ["image", "tab", "panel", "galleria", "tablist", "button", "tabs", "panel", "tabpanel"];

list().forEach(file => {
    let data = fs.readFileSync(file, {encoding: "utf8"})
        .replaceAll("../../_virtual/_plugin-vue_export-helper.js", "./_virtual/_plugin-vue_export-helper.js")
        .replaceAll("../../node_modules/", "")
        .replaceAll("@mdx-js/vue/lib/index.js", "@mdx-js/vue")
        .replaceAll("./main.module.css.js", "./main.module.css");
    if (file === "./dist/Article54.vue.js") {
        data = `import "katex/dist/katex.min.css";\nimport "highlight.js/styles/base16/framer.min.css";\n` + data;
    }
    primevueDirs.forEach(dir => data = data.replaceAll(`primevue/${dir}/index.js`, `primevue/${dir}`))
    fs.writeFileSync(file, data, {encoding: "utf8"});
});