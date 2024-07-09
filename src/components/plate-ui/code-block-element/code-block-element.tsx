import "./code-block-element.css";

import { cn, withRef } from "@udecode/cn";
import { useCodeBlockElementState } from "@udecode/plate-code-block";
import { PlateElement } from "@udecode/plate-common";

import { CodeBlockCombobox } from "../code-block-combobox/code-block-combobox";

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    return (
      <PlateElement
        ref={ref}
        className={cn(
          "relative text-gray-500 py-1",
          state.className,
          className
        )}
        {...props}>
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2] code-block ">
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className="absolute z-10 select-none right-2 top-2"
            contentEditable={false}>
            <CodeBlockCombobox />
          </div>
        )}
      </PlateElement>
    );
  }
);
