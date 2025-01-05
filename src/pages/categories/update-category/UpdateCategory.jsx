import { useState, useEffect, useContext } from "react";
import classes from "./updatecategory.module.css";
import Headers from "./Headers";
import AddTags from "./AddTags";
import Button from "../../../components/button/Button";
import defaultIcon from "../../../images/settings - alt2.png";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesContext } from "../Categories";

function UpdateCategory() {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryTags, setCategoryTags] = useState("");
  const [categoryJobs, setCategoryJobs] = useState(0);
  const [categorySubs, setCategorySubs] = useState(0);
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [icon, setIcon] = useState(defaultIcon);
  const { dummyCategories, onUpdate } = useContext(CategoriesContext);
  const { catId } = useParams();
  const navigate = useNavigate();

  const category = dummyCategories.find((cat) => cat.catId === catId);

  useEffect(() => {
    if (category) {
      setCategoryTitle(category.title || "");
      setDescription(category.description || "");
      setCategoryTags(category.tags || "");
      setCategoryJobs(category.jobs || 0);
      setCategorySubs(category.subs || 0);
      setCategoryStatus(category.status || "Active");
      setIcon(category.icon || defaultIcon);
    }
  }, [category]);

  if (!category) {
    return <p>Category not found.</p>;
  }

  const maxChars = 128;

  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const updatedCategory = {
      ...category,
      title: categoryTitle,
      description: description,
      tags: categoryTags.length,
      jobs: categoryJobs,
      subs: categorySubs,
      status: categoryStatus,
      icon: icon,
    };

    onUpdate(updatedCategory);
    setCategoryTitle("");
    setDescription("");
    setCategoryTags("");
    setCategoryJobs(0);
    setCategorySubs(0);
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
    categoryTitle !== "" && description !== "" && icon !== defaultIcon;

  return (
    <div className={classes["update-category"]}>
      <Headers />
      <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
        <p className={classes["cat-id"]}>{category.catId}</p>
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
          <AddTags onChange={setCategoryTags} />
        </div>
      </div>
      <div className={classes["save-btn"]}>
        <Button
          type="submit"
          className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
          disabled={!isFormValid}
          onClick={handleUpdateCategory}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default UpdateCategory;
