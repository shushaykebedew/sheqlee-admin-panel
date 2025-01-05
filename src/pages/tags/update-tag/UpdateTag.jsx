import { useState, useEffect, useContext } from "react";
import classes from "./updatetag.module.css";
import Headers from "./Headers";
import Button from "../../../components/button/Button";
import defaultIcon from "../../../images/settings - alt2.png";
import { useNavigate, useParams } from "react-router-dom";
import { TagsContext } from "../Tags";
import AddCats from "./AddCats";

function UpdateTag() {
  const [tagTitle, setTagTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagCats, setTagCats] = useState("");
  const [tagJobs, setTagJobs] = useState(0);
  const [tagSubs, setTagSubs] = useState(0);
  const [tagStatus, setTagStatus] = useState("Active");
  const [icon, setIcon] = useState(defaultIcon);
  const { dummyTags, onUpdate } = useContext(TagsContext);
  const { tagId } = useParams();
  const navigate = useNavigate();

  const tag = dummyTags.find((tag) => tag.tagId === tagId);

  useEffect(() => {
    if (tag) {
      setTagTitle(tag.title || "");
      setDescription(tag.description || "");
      setTagCats(tag.tags || "");
      setTagJobs(tag.jobs || 0);
      setTagSubs(tag.subs || 0);
      setTagStatus(tag.status || "Active");
      setIcon(tag.icon || defaultIcon);
    }
  }, [tag]);

  if (!tag) {
    return <p>Tag not found.</p>;
  }

  const maxChars = 128;

  const handleUpdateTag = (e) => {
    e.preventDefault();

    const updatedTag = {
      ...tag,
      title: tagTitle,
      description: description,
      tags: tagCats.length,
      jobs: tagJobs,
      subs: tagSubs,
      status: tagStatus,
      icon: icon,
    };

    onUpdate(updatedTag);
    setTagTitle("");
    setDescription("");
    setTagCats("");
    setTagJobs(0);
    setTagSubs(0);
    setIcon(defaultIcon);
    navigate("..");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setIcon(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const isFormValid =
    tagTitle !== "" && description !== "" && icon !== defaultIcon;

  return (
    <div className={classes["update-tag"]}>
      <Headers />
      <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
        <p className={classes["cat-id"]}>{tag.tagId}</p>
        <p>~ Tag ID</p>
      </div>
      <div className={classes.inputs}>
        <div className={classes["text-inputs"]}>
          <div className={classes.input}>
            <input
              type="text"
              placeholder="Tag title"
              value={tagTitle}
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
          <AddCats onChange={setTagCats} />
        </div>
      </div>
      <div className={classes["save-btn"]}>
        <Button
          type="submit"
          className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
          disabled={!isFormValid}
          onClick={handleUpdateTag}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default UpdateTag;
