import { useContext, useEffect, useState } from "react";
import classes from "./updatetestimonial.module.css";
import Headers from "./Headers";
import Button from "../../../../components/button/Button";
import defaultLogo from "../../../../images/settings - alt2.png";
import { TestimonialsContext } from "../Testimonials";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTestimonial() {
  const { onUpdateTestimonial, dummyTestimonials } =
    useContext(TestimonialsContext);

  const [logo, setLogo] = useState(defaultLogo);
  const [companyName, setCompanyName] = useState("");
  const [testimony, setTestimony] = useState("");
  const [companyRep, setCompanyRep] = useState("");
  const [position, setPosition] = useState("");

  const navigate = useNavigate();
  const { testimonialId } = useParams();

  const testimonial = dummyTestimonials.find(
    (testimonial) => testimonial.testimonialId === testimonialId
  );

  useEffect(() => {
    if (testimonial) {
      setLogo(testimonial.logo || defaultLogo);
      setCompanyName(testimonial.companyName || "");
      setTestimony(testimonial.testimony || "");
      setCompanyRep(testimonial.companyRep || "");
      setPosition(testimonial.position || "");
    }
  }, [testimonial]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTestimonial = {
      ...testimonial,
      logo: logo,
      companyName: companyName,
      testimony: testimony,
      companyRep: companyRep,
      position: position,
    };

    onUpdateTestimonial(updatedTestimonial);
    navigate("..");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const isFormValid =
    logo !== defaultLogo &&
    companyName !== "" &&
    testimony !== "" &&
    companyRep !== "" &&
    position !== "";

  return (
    <div className={classes["update-testimonial"]}>
      <Headers />
      <form onSubmit={handleSubmit}>
        <div className={classes.inputs}>
          <div className={classes["text-inputs"]}>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Company Rep"
                value={companyRep}
                onChange={(e) => setCompanyRep(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)} // Corrected to setPosition
              />
            </div>
            <div className={classes.textarea}>
              <textarea
                placeholder="Testimony"
                rows={4}
                value={testimony}
                onChange={(e) => setTestimony(e.target.value)}
              />
            </div>
          </div>
          <div className={classes["image-inputs"]}>
            <div className={classes["testimonial-logo-container"]}>
              <img
                src={logo}
                alt="testimonial-logo"
                className={classes["testimonial-logo"]}
              />
            </div>
            <label className={classes["upload-button"]}>
              {logo === defaultLogo ? "Upload logo" : "Change logo"}
              <input
                type="file"
                accept="images/*"
                className={classes["file-input"]}
                onChange={handleFileChange}
              />
            </label>
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

export default UpdateTestimonial;
