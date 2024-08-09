import { useCallback, useRef, useState } from "react";
// import { SoftyNote } from "./components/softy-note";
import { HTMLDivElementWithEditor } from "./components/plate-ui/editor/editor";
import { SoftyNote } from "./components/softy-note";
// import { MentionComponentItem } from "./mentioncompo";

const initialValue = [
  {
    children: [
      {
        text: "",
      },
    ],
    type: "h1",
    align: "center",
  },
  {
    children: [
      {
        text: "",
      },
    ],
    type: "p",
    id: "qln83",
  },
];
function App() {
  const editorRef = useRef<HTMLDivElementWithEditor>(null);
  const [_, setAlo] = useState(initialValue);

  // const onUpload = useCallback(async () => {
  //   const url =
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgtcEEuG2MwqvoV_84_hieLovVAIP3km8FmQV6_XFHxD3u3dBEtXsKzgMURT6ORBPRJk0&usqp=CAU";
  //   return url;
  // }, []);
  // const x = alo;

  // const MemoizedChildComponent = React.memo(SoftyNote);
  const handelSelectedFile = useCallback(
    (SelectedFileData: { type: string; url: string }) => {
      return SelectedFileData;
    },
    []
  );
  const handleChange = useCallback((value: any) => {
    console.log(value);
    setAlo(value);
  }, []);
  return (
    <div>
      <button
      // onClick={() => {
      //   setAlo(Math.random());
      //   // editorRef.current.editor.reset();
      //   // if (document.documentElement.lang === "ar") {
      //   //   document.documentElement.lang = "en";
      //   // } else if (document.documentElement.lang === "en") {
      //   //   document.documentElement.lang = "ar";
      //   // }
      // }}
      >
        click here
      </button>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="border border-black ">
          <SoftyNote
            onChange={handleChange}
            initialValue={initialValue}
            handelSelectedFile={handelSelectedFile}
            ref={editorRef}

            // onUpload={onUpload}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
