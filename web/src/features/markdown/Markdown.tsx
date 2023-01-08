import DOMPurify from "dompurify";
import { marked } from "marked";
import React from "react";
import { classNames } from "../../app/tailwindHelpers";

import "./markdown.css";

marked.use({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
  renderer: {
    heading(text: string, level: number) {
      const firstLevel = 3;
      const maxLevel = 6;
      level = Math.min(level + firstLevel - 1, maxLevel);
      return `<h${level}>${text}</h${level}>`;
    },
  },
});

interface MarkdownProps {
  data: string;
  small?: boolean;
}

function Markdown(props: MarkdownProps) {
  let small = props.small ?? false;

  let unsanitized;
  try {
    unsanitized = marked.parse(props.data);
  } catch (err) {
    console.warn("Error parsing markdown", err, props.data);
    return (
      <pre>
        <code>{`Invalid markdown: ${err}`}</code>
      </pre>
    );
  }

  let sanitized = DOMPurify.sanitize(unsanitized);

  return (
    <p
      className={classNames("md", small && "md-small")}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

export default React.memo(Markdown);
