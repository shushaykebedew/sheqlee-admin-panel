import { useContext, useState, useEffect } from "react";
import classes from "./updatefaq.module.css";
import Headers from "./Headers";
import SelectAudience from "./SelectAudience";
import { FAQsContext } from "../FAQ";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/button/Button";

function UpdateFAQ() {
  const { onUpdateFAQ, dummyFAQs } = useContext(FAQsContext);
  const [question, setQuestion] = useState("");
  const [audience, setAudience] = useState("");
  const [answer, setAnswer] = useState("");
  const [FAQStatus, setFAQStatus] = useState("Active");
  const navigate = useNavigate();
  const { faqId } = useParams();

  const faq = dummyFAQs.find((faq) => faq.faqId === faqId);

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAudience(faq.audience);
      setAnswer(faq.answer);
      setFAQStatus(faq.status);
    }
  }, [faq]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFAQ = {
      ...faq,
      question: question,
      audience: audience,
      answer: answer,
      status: FAQStatus,
      updatedOn: new Date().toLocaleDateString(),
    };

    onUpdateFAQ(updatedFAQ);
    navigate("..");
  };

  const handleAudienceChange = (newAudience) => {
    setAudience(newAudience);
  };

  const isFormValid = question !== "" && audience !== "" && answer !== "";

  return (
    <div className={classes["update-faq"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={`${classes.label} ${isFormValid ? classes.valid : ""}`}>
          <p className={classes["faq-id"]}>{faq.faqId || "New FAQ"}</p>
          <p>~ FAQ ID</p>
        </div>
        <div className={classes.inputs}>
          <div className={classes["dropdown"]}>
            <SelectAudience
              onChange={handleAudienceChange}
              selectedAudience={audience}
            />
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateFAQ;
