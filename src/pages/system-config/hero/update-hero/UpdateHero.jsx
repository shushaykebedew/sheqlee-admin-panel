import { useContext, useEffect, useState } from "react";
import classes from "./updatehero.module.css";
import Headers from "./Headers";
import Button from "../../../../components/button/Button";
import { HeroContext } from "../Hero";
import { useNavigate, useParams } from "react-router-dom";
import { PencilIcon } from "../../../../SvgIcons";

function UpdateHero() {
  const { onUpdateSection, heroData } = useContext(HeroContext);
  const [content, setContent] = useState("");
  const [showCounter, setShowCounter] = useState(true);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const section = heroData.find((section) => section.sectionId === sectionId);

  useEffect(() => {
    if (section) {
      setContent(section.content || "");
      const config = getSectionConfig(sectionId);
      setShowCounter(config.showCounter);
      setIsFileUpload(config.isFileUpload);
    }
  }, [section, sectionId]);

  // Determine max characters, rows, and placeholder dynamically
  const getSectionConfig = (sectionId) => {
    switch (sectionId) {
      case "hero-title":
        return {
          maxChars: 64,
          rows: 2,
          placeholder: "Enter title...",
          showCounter: true,
          isFileUpload: false,
        };
      case "hero-description":
        return {
          maxChars: 128,
          rows: 4,
          placeholder: "Enter description...",
          showCounter: true,
          isFileUpload: false,
        };
      case "hero-animation":
        return {
          maxChars: 0,
          rows: 1,
          placeholder: "",
          showCounter: false,
          isFileUpload: true,
        };
      default:
        return {
          maxChars: 128,
          rows: 4,
          placeholder: "Update content...",
          showCounter: true,
          isFileUpload: false,
        };
    }
  };

  const { maxChars, rows, placeholder } = getSectionConfig(sectionId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/json") {
      setContent(file.name);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHero = {
      ...section,
      content: content,
    };

    onUpdateSection(updatedHero);
    navigate("..");
  };

  const isFormValid = isFileUpload
    ? content.trim() !== ""
    : content.trim() !== "";

  return (
    <div className={classes["update-hero"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={classes.label}>
          <p>{section?.title || "Untitled"}</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.textarea}>
              {isFileUpload ? (
                <label className={classes["upload-json"]}>
                  Upload Json
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className={classes["file-input"]}
                  />
                </label>
              ) : (
                <>
                  <textarea
                    placeholder={placeholder}
                    rows={rows}
                    maxLength={maxChars}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  {showCounter && (
                    <span className={classes.counter}>
                      {content.length}/{maxChars}
                    </span>
                  )}
                  <span className={classes.pencil}>
                    <PencilIcon />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes["save-btn"]}>
          <Button
            type="submit"
            className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
            disabled={!isFormValid}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateHero;
