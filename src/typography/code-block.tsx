import type { ComponentProps } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export type CodeBlockType = {
  code: string;
  language?: string;
} & ComponentProps<"pre">;

/** *
 * @function CodeBlock
 *
 * Preserving whitespace and line breaks is a little tricky. In short, just try to follow the example below and make sure you use a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a normal string.
 *
 * @see {@link https://rfui-docs.onrender.com/components/typography/code-block}
 *
 * @param language - See this list: {@link https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD}.
 * 
 * @example
 * <CodeBlock
    language="ts"
    code={`const firstName = 'John';
const lastName = 'Doe';
const fullName = firstName + " " + lastName;`}
/>
 */
export const CodeBlock = ({ code, language, ...rest }: CodeBlockType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "block whitespace-pre-wrap bg-neutral-50 p-5";

  if (language) {
    className += ` language-${language}`;
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  if (language) {
    return (
      <SyntaxHighlighter
        className={className}
        language={language}
        tabIndex={-1}
      >
        {code}
      </SyntaxHighlighter>
    );
  }

  return (
    <pre className={className} tabIndex={-1} {...restWithoutClass}>
      <code>{code}</code>
    </pre>
  );
};
