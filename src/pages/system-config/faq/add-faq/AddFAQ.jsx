import { useContext, useState } from "react";
import classes from "./addfaq.module.css";
import Headers from "./Headers";
import SelectRole from "./SelectAudience";
import { FAQsContext } from "../FAQ";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/Button";

function AddFAQ() {
  const { onAddFAQ } = useContext(FAQsContext);
  const [question, setQuestion] = useState("");
  const [audience, setAudience] = useState("");
  const [answer, setAnswer] = useState("");
  const [FAQStatus, setFAQStatus] = useState("Active");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFAQ = {
      faqId: Date.now(),
      question: question,
      audience: audience,
      answer: answer,
      status: FAQStatus,
      createdOn: new Date().toLocaleDateString(),
    };

    onAddFAQ(newFAQ);
    navigate("..");
    // Reset the form
    setQuestion("");
    setAudience("");
    setAnswer("");
    setFAQStatus("Active");
  };

  const handleAudienceChange = (newAudience) => {
    setAudience(newAudience);
  };

  const isFormValid = question !== "" && audience !== "" && answer !== "";

  return (
    <div className={classes["add-faq"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["faq-id"]}>FQID009</p>
          <p>~ FAQ ID</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["dropdown"]}>
            <SelectRole onChange={handleAudienceChange} />
          </div>
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className={classes.textarea}>
              <textarea
                placeholder="Answer..."
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={classes["save-btn"]}>
          <Button
            type="submit"
            className={`${classes.button} ${isFormValid ? classes.valid : ""}`}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddFAQ;
