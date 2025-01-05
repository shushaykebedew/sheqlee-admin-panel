import { useContext, useState } from "react";
import classes from "./addtag.module.css";
import Headers from "./Headers";
import AddCats from "./AddCats";
import Button from "../../../components/button/Button";
import defaultIcon from "../../../images/settings - alt2.png";
import { TagsContext } from "../Tags";
import { useNavigate } from "react-router-dom";

function AddTag() {
  const { onAddTag } = useContext(TagsContext);
  const [TagTitle, setTagTitle] = useState("");
  const [description, setDescription] = useState("");
  const [TagCats, setTagCats] = useState("");
  const [TagJobs, setTagJobs] = useState(0);
  const [TagSubs, setTagSubs] = useState(0);
  const [TagStatus, setTagStatus] = useState("Active");
  const [icon, setIcon] = useState(defaultIcon);
  const navigate = useNavigate();
  const maxChars = 128;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTag = {
      tagId: Date.now(),
      title: TagTitle,
      tags: TagCats,
      jobs: TagJobs,
      subs: TagSubs,
      status: TagStatus,
      createdOn: new Date().toLocaleDateString(),
    };

    onAddTag(newTag);

    // Reset the form
    setTagTitle("");
    setDescription("");
    setTagCats("");
    setTagJobs(0);
    setTagSubs(0);
    setTagStatus("Active");
    setIcon(defaultIcon);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setIcon(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    navigate("..");
  };

  const handleTagsChange = (newTags) => {
    setTagCats(newTags.length);
  };

  const isFormValid =
    TagTitle !== "" && description !== "" && icon !== defaultIcon;

  return (
    <div className={classes["add-Tag"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["cat-id"]}>TGID009</p>
          <p>~ Tag ID</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Tag title"
                value={TagTitle}
                onChange={(e) => setTagTitle(e.target.value)}
              />
            </div>
            <div className={classes.textarea}>
              <textarea
                placeholder="Brief description"
                rows={4}
                maxLength={128}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className={classes.counter}>
                {description.length}/{maxChars}
              </span>
            </div>
          </div>
          <div className={classes["image-inputs"]}>
            <div className={classes["cat-icon-container"]}>
              <img src={icon} alt="Tag-icon" className={classes["Tag-icon"]} />
            </div>
            <label className={classes["upload-button"]}>
              Upload icon
              <input
                type="file"
                accept="images/*"
                className={classes["file-input"]}
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className={classes["dropdown"]}>
            <AddCats onChange={handleTagsChange} />
          </div>
        </div>
        <div className={classes["save-btn"]}>
          <Button
            type="submit"
            className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
            disabled={!isFormValid}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTag;
