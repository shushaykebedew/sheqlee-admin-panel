import { useContext, useState } from "react";
import classes from "./addcategory.module.css";
import Headers from "./Headers";
import AddTags from "./AddTags";
import Button from "../../../components/button/Button";
import defaultIcon from "../../../images/settings - alt2.png";
import { CategoriesContext } from "../Categories";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const { onAddCategory } = useContext(CategoriesContext);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTags, setCategoryTags] = useState("");
  const [categoryJobs, setCategoryJobs] = useState(0);
  const [categorySubs, setCategorySubs] = useState(0);
  const [icon, setIcon] = useState(defaultIcon);
  const navigate = useNavigate();
  const maxChars = 128;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      catId: Date.now(),
      title: categoryTitle,
      tags: categoryTags,
      jobs: categoryJobs,
      subs: categorySubs,
      createdOn: new Date().toLocaleDateString(),
    };

    onAddCategory(newCategory);

    // Reset the form
    setCategoryTitle("");
    setDescription("");
    setCategoryTags("");
    setCategoryJobs(0);
    setCategorySubs(0);
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
    setCategoryTags(newTags.length);
  };

  const isFormValid =
    categoryTitle !== "" && description !== "" && icon !== defaultIcon;

  return (
    <div className={classes["add-category"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["cat-id"]}>CTID009</p>
          <p>~ Category ID</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Category title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
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
              <img
                src={icon}
                alt="category-icon"
                className={classes["category-icon"]}
              />
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
            <AddTags onChange={handleTagsChange} />
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

export default AddCategory;
