import { useContext, useEffect, useState } from "react";
import classes from "./updatefooter.module.css";
import Headers from "./Headers";
import Button from "../../../../components/button/Button";
import { FooterContext } from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import { PencilIcon } from "../../../../SvgIcons";

function UpdateFooter() {
  const { onUpdateSection, footerData } = useContext(FooterContext);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const section = footerData.find((section) => section.sectionId === sectionId);

  useEffect(() => {
    if (section) {
      setContent(section.content || "");
    }
  }, [section, sectionId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFooter = {
      ...section,
      content: content,
    };

    onUpdateSection(updatedFooter);
    navigate("..");
  };

  const isFormValid = content !== "";

  return (
    <div className={classes["update-footer"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={classes.label}>
          <p>{section?.title || "Untitled"}</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.textarea}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

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

export default UpdateFooter;
