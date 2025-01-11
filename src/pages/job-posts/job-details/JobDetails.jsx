import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobsContext } from "../JobPosts";
import classes from "./jobdetails.module.css";
import { BackwardArrowIcon } from "../../../SvgIcons";

const jobData = {
  qualifications: [
    "Bachelor's degree with a major in graphic design or a related field from an accredited college or university preferred.",
  ],
  experience: [
    "Four (4) years of graphic/web design experience or equivalent combination of education and experience required.",
  ],
  skills: [
    "Excellent knowledge of graphic and photo software.",
    "Good knowledge of web technology.",
    "Excellent oral and written communication skills, including presentation skills.",
    "PC literate, including Microsoft Office products.",
    "Strong organizational skills.",
    "Excellent interpersonal skills.",
    "Ability to work on multiple projects and meet deadlines.",
    "Ability to work in a team environment.",
    "Ability to meet or exceed performance competencies.",
  ],
  description:
    "For a career path that is both challenging and rewarding, join Sedgwick's talented team of 27,000 colleagues around the globe. Sedgwick is a leading provider of technology-enabled risk, benefits and integrated business solutions. Taking care of people is at the heart of everything we do. Millions of people and organizations count on Sedgwick each year to take care of their needs when they face a major life event or something unexpected happens. Whether they have a workplace injury, suffer property or financial loss or damage from a natural or manmade disaster, are involved in an auto or other type of accident, or need time away from work for the birth of a child or another medical situation, we are here to provide compassionate care and expert guidance. Our clients depend on our talented colleagues to take care of their most valuable assets-their employees, their customers and their property. At Sedgwick, caring counts. Join our team of creative and caring people of all backgrounds, and help us make a difference in the lives of others. ",
  primaryPurpose:
    "To design and produce presentations, technical and conceptual web graphics, interactive marketing materials, and print materials.",
};

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dummyJobPosts } = useContext(JobsContext);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const job = dummyJobPosts.find((post) => post.id === id);
    if (job) {
      setJobDetails(job);
    }
  }, [id, dummyJobPosts]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes["job-details"]}>
      <div className={classes["go-back"]}>
        <button
          className={classes["go-back-button"]}
          onClick={() => navigate("..")}
        >
          <BackwardArrowIcon />
        </button>
      </div>
      <h1 className={classes["job-title"]}>{jobDetails.title}</h1>
      <div className={classes["job-details-content"]}>
        <p>
          We need one to Designs and maintains prospect websites including
          graphic development, site architecture, and functionality, regular
          site updates, usability reviews and traffic reporting.
        </p>
        <div className={classes.qualifications}>
          <label>Qualifications</label>
          <ul>
            {jobData.qualifications.map((qualification, index) => (
              <li key={index}> - {qualification}</li>
            ))}
          </ul>
        </div>
        <div className={classes.experience}>
          <label>Experience</label>
          <ul>
            {jobData.experience.map((experience, index) => (
              <li key={index}> - {experience}</li>
            ))}
          </ul>
        </div>
        <div className={classes.skills}>
          <label>Skills & Knowledge</label>
          <ul>
            {jobData.skills.map((skill, index) => (
              <li key={index}> - {skill}</li>
            ))}
          </ul>
        </div>
        <div className={classes.description}>
          <label>Description</label>
          <p> {jobData.description}</p>
        </div>
        <div className={classes["primary-purpose"]}>
          <label> Primary Purpose: </label>
          <span>{jobData.primaryPurpose}</span>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
