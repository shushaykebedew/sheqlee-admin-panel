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
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const section = heroData.find((section) => section.sectionId === sectionId);

  useEffect(() => {
    if (section) {
      setContent(section.content || "");
      const config = getSectionConfig(sectionId);
      setShowCounter(config.showCounter);
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
        };
      case "hero-description":
        return {
          maxChars: 128,
          rows: 4,
          placeholder: "Enter description...",
          showCounter: true,
        };
      case "hero-animation":
        return {
          maxChars: 128,
          rows: 1,
          placeholder: "Enter animation URL...",
          showCounter: false,
        };
      default:
        return {
          maxChars: 128,
          rows: 4,
          placeholder: "Update content...",
          showCounter: true,
        };
    }
  };

  const { maxChars, rows, placeholder } = getSectionConfig(sectionId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHero = {
      ...section,
      content: content,
    };

    onUpdateSection(updatedHero);
    navigate("..");
  };

  const isFormValid = content.trim() !== "";

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
