<script setup lang="ts">
import {MDXProvider} from "@mdx-js/vue";
import "katex/dist/katex.min.css";
import "highlight.js/styles/base16/framer.min.css";
import {onMounted, useCssModule, useTemplateRef} from "vue";

const mdx = useTemplateRef("mdx");
const style = useCssModule();

function addCodeCopyButtons() {
  if (!mdx.value) return;
  if (!mdx.value.querySelectorAll("pre code").length) setTimeout(addCodeCopyButtons, 10);
  mdx.value.querySelectorAll("pre code").forEach(codeBlock => {
    const copyButton = document.createElement("button");
    copyButton.innerText = "Copy";
    copyButton.classList.add(style["copy-button"]);

    const pre = codeBlock.parentElement;
    if (!pre) return;
    pre.style.position = "relative";
    copyButton.style.position = "absolute";
    copyButton.style.top = "0";
    copyButton.style.right = "0";
    pre.appendChild(copyButton);

    copyButton.addEventListener("click", () => {
      if (!("innerText" in codeBlock) || typeof codeBlock.innerText !== "string") return;
      const code = codeBlock.innerText;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.innerText = "Copied!";
        setTimeout(() => {
          copyButton.innerText = "Copy";
        }, 2000);
      });
    });
  });
}

onMounted(() => {
  addCodeCopyButtons();
});
</script>

<template>
  <main ref="mdx" :class="$style.mdx">
    <MDXProvider>
      <slot/>
    </MDXProvider>
  </main>
</template>

<style module>
.mdx .copy-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 10px 20px 10px 10px;
  transition: background-color 0.2s;

  @media (hover: hover) {
    &:hover {
      background: #0056b3;
    }
  }
}

.mdx pre code {
  border-radius: 20px;
}

.mdx pre {
  margin: 0;
}

.mdx > * {
  margin-bottom: 10px !important;
}
</style>