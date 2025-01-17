import React, { useRef, useState } from "react";

// @ts-ignore
import * as MathType from "@wiris/mathtype-generic";

import EquationEditor from "./WirisEquationEditor.jsx";
import { getNode, removeNodes } from "@udecode/plate-common";
import { insertMath } from "../../../lib/plate/insertMath.js";

interface MyComponentProps {
  elementId: string;
  editor: any;
}

const MathComponent: React.FC<MyComponentProps> = ({ elementId, editor }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [mathValue, setMathValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const onEquationChange = (event: any) => {
    const mathFormat = (window as any).WirisPlugin.Parser.endParse(
      event.target.value
    );
    setMathValue(mathFormat);
  };

  const handleSubmit = () => {
    setIsOpen(false);
    const x = getNode(editor, []);
    const elements: any = x?.children;
    const index = elements.findIndex(
      (el: any) => el.type === "insert-math" && el.id === elementId
    );
    removeNodes(editor, {
      at: [index],
    });
    insertMath(editor, { mathValue: mathValue.replaceAll('"', "“") });
  };

  const handleCancel = () => {
    setIsOpen(false);
    const x = getNode(editor, []);
    const elements: any = x?.children;
    const index = elements.findIndex(
      (el: any) => el.type === "insert-math" && el.id === elementId
    );
    removeNodes(editor, {
      at: [index],
    });
  };

  return (
    <>
      {isOpen && (
        <div className="overflow-y-auto  overflow-x-hidden flex backdrop-blur-sm fixed top-0 right-0 left-0 z-[999999] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
          <div className="relative w-full max-w-2xl max-h-full p-4">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 math-modal">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Mathematics + Chemistry Operations
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCancel}>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="mt-4">
                <p>Click : √ for Math , C for Chemistry</p>
              </div>
              <>
                <div ref={toolbarRef} />
                <EquationEditor
                  onEquationInput={onEquationChange}
                  toolbarRef={toolbarRef}
                  value={mathValue}
                />
              </>
              <div className="flex items-center p-4 border-t border-gray-200 rounded-b md:p-5 dark:border-gray-600">
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MathComponent;
