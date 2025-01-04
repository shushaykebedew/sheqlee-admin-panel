import { useState } from "react";
import Headers from "./heading/Headers";
import classes from "./addcategory.module.css";
import Input from "./Input";
import TextArea from "./TextArea";
import Label from "./Label";
import ImageInput from "./ImageInput";
import UploadButton from "./UploadButton";
import AddTags from "./AddTags";

function AddCategory() {
  const [newCategory, setNewCategory] = useState("");
  return (
    <div className={classes["add-category"]}>
      <Headers />
      <Label />
      <div className={classes.inputs}>
        <div className={classes["text-inputs"]}>
          <Input
            placeholder="Category title..."
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <TextArea
            placeholder="Brief description..."
            rows={4}
            maxChars={128}
          />
        </div>
        <div className={classes["image-inputs"]}>
          <ImageInput />
          <UploadButton>Upload icon</UploadButton>
        </div>
        <div className={classes["dropdown"]}>
          <AddTags />
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
