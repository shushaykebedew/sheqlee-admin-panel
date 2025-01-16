import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./update-apgspptscp.module.css";
import { BackwardArrowIcon, PolygonDown } from "../../../../SvgIcons";
import { APGSPPTSCP_Context } from "../APGSPPTSCP";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function UpdateAPGSPPTSCP() {
  const { dispatch, dummyAPGSPPTSCP } = useContext(APGSPPTSCP_Context);
  const { pageId } = useParams();
  const navigate = useNavigate();

  // Find the page based on pageId
  const page = dummyAPGSPPTSCP.find((page) => page.pageId === pageId);

  // Find the latest iteration for the selected page
  const latestIteration = page?.iterations.reduce((latest, current) =>
    new Date(current.updatedOn) > new Date(latest.updatedOn) ? current : latest
  );

  const [selectedIteration, setSelectedIteration] = useState(latestIteration);

  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  const handleGoBack = () => {
    navigate("..");
  };

  useEffect(() => {
    if (!editorRef.current) return;

    // Only initialize Quill if it's not already initialized
    if (!quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Formatted text...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
      });
    }

    if (
      selectedIteration?.content &&
      quillInstance.current.root.innerHTML !== selectedIteration.content
    ) {
      quillInstance.current.root.innerHTML = selectedIteration.content;
    }

    return () => {
      quillInstance.current = null; // Clean up Quill instance when the component unmounts
    };
  }, []); // Empty dependency array ensures initialization happens once

  useEffect(() => {
    if (!quillInstance.current) return;

    const handleChange = () => {
      setSelectedIteration((prev) => ({
        ...prev,
        content: quillInstance.current.root.innerHTML,
      }));
    };

    quillInstance.current.on("text-change", handleChange);

    return () => {
      if (quillInstance.current) {
        quillInstance.current.off("text-change", handleChange);
      }
    };
  }, [selectedIteration]);

  const handleSave = () => {
    dispatch({
      type: "UPDATE_PAGE",
      payload: {
        pageId,
        updatedContent: selectedIteration,
      },
    });

    navigate("..");
  };

  return (
    <div className={classes["update-apgspptscp"]}>
      <div className={classes.headers}>
        <div className={classes.header}>
          <button className={classes.backward} onClick={handleGoBack}>
            <BackwardArrowIcon />
          </button>
          <div className={classes["main-header"]}>
            <h1 className={classes["main-header-text"]}>
              Update {page.pageTitle}
            </h1>
            <div className={classes["main-header-line"]}></div>
          </div>
        </div>
        <div className={classes.version}>
          <span>v{Number(selectedIteration?.iteration) + 1}</span>{" "}
        </div>
        <div className={classes["button-container"]}>
          <button className={classes["create-button"]} onClick={handleSave}>
            Update {page.pageTitle}
          </button>
        </div>
      </div>
      <div className={classes["rich-text-editor"]} ref={editorRef}></div>
    </div>
  );
}

export default UpdateAPGSPPTSCP;
