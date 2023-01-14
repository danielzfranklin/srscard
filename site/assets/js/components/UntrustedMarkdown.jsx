import React from "react";
import { marked } from "marked";

/* TODO: Do on server, gfm */

export default function UntrustedMarkdown({ content }) {
    const body = marked.parse(content, {
        gfm: true,
        breaks: true,
    });

    const html = `
<!doctype html>
<html>
    <body>
        ${body}
    <body>
</html>
`.trim();

    <iframe
        sandbox="allow-scripts"
        srcdoc={html}
        style="width: 100%"
    ></iframe>
}
