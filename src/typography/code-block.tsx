import { Highlight, themes } from "prism-react-renderer";
import type { ComponentProps } from "react";

export type CodeBlockType = {
  code: string;
  language?: string;
  theme?: string;
} & ComponentProps<"pre">;

/** *
 * @function CodeBlock
 *
 * Preserving whitespace and line breaks is a little tricky. In short, just try to follow the example below and make sure you use a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a normal string.
 *
 * @see {@link https://rfui.deno.dev/atoms/code-block}
 *
 * @param language - See {@link https://github.com/FormidableLabs/prism-react-renderer?tab=readme-ov-file#custom-language-support}.
 *
 * @param theme - See {@link https://github.com/FormidableLabs/prism-react-renderer?tab=readme-ov-file#theming}.
 * 
 * @example
 * <CodeBlock
    language="ts"
    code={`const firstName = 'John';
const lastName = 'Doe';
const fullName = firstName + " " + lastName;`}
/>
 */
export const CodeBlock = ({
  code,
  language,
  theme,
  ...rest
}: CodeBlockType) => {
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
      <Highlight theme={themes.github} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="p-4 overflow-x-scroll">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }

  return (
    <pre className={className} {...restWithoutClass}>
      <code>{code}</code>
    </pre>
  );
};
