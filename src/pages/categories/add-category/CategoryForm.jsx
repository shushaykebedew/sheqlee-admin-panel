// src/CategoryForm.js
import React, { useState } from "react";

const MAX_DESCRIPTION_LENGTH = 128; // Define the max length

const CategoryForm = () => {
  const [formValues, setFormValues] = useState({
    categoryId: "CTID009",
    title: "",
    description: "",
    icon: null,
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, icon: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values: ", formValues);
    // Add logic to handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add a New Category</h2>

      <label>
        Category ID
        <input
          type="text"
          value={formValues.categoryId}
          disabled
          style={styles.input}
        />
      </label>

      <label>
        Category title...
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={formValues.title}
          style={styles.input}
        />
      </label>

      <label>
        Brief description...
        <textarea
          name="description"
          onChange={handleChange}
          value={formValues.description}
          rows="4"
          style={styles.textarea}
        />
      </label>
      <div style={styles.charCount}>
        {formValues.description.length}/{MAX_DESCRIPTION_LENGTH} characters
      </div>

      <label style={styles.uploadLabel}>
        Upload icon
        <input
          type="file"
          accept="image/*"
          onChange={handleIconUpload}
          style={styles.uploadInput}
        />
      </label>

      <label>
        Add tags
        <input
          type="text"
          name="tags"
          onChange={handleChange}
          value={formValues.tags}
          style={styles.input}
        />
      </label>

      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  charCount: {
    textAlign: "right",
    color: "#666",
    fontSize: "0.8em",
    marginBottom: "10px",
  },
  uploadLabel: {
    margin: "10px 0",
    cursor: "pointer",
    color: "#6C63FF",
  },
  uploadInput: {
    display: "none",
  },
  button: {
    backgroundColor: "#6C63FF",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CategoryForm;
