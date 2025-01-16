import React, { useContext, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import classes from "./readapgspptscp.module.css";
import { BackwardArrowIcon } from "../../../../SvgIcons";
import { APGSPPTSCP_Context } from "../APGSPPTSCP";
import FilterVersion from "./FilterVersion";

function ReadAPGSPPTSCP() {
  const { dummyAPGSPPTSCP } = useContext(APGSPPTSCP_Context);
  const { pageId } = useParams();
  const { state } = useLocation(); // Access passed state
  const navigate = useNavigate();

  // Find the page based on pageId
  const page = dummyAPGSPPTSCP.find((page) => page.pageId === pageId);

  // Get the current iteration from state or fallback to the first iteration
  const initialIteration = state?.iteration || page.iterations[0].iteration;

  const [selectedIteration, setSelectedIteration] = useState(
    page.iterations.find(
      (iteration) => iteration.iteration === initialIteration
    )
  );

  // Extract unique iterations
  const uniqueVersions = page.iterations
    .map((iteration) => iteration.iteration)
    .sort((a, b) => Number(a) - Number(b)); // Sort numerically

  const handleFilterChange = (iteration) => {
    const newIteration = page.iterations.find(
      (item) => item.iteration === iteration
    );
    setSelectedIteration(newIteration);
  };

  return (
    <div className={classes["read-apgspptscp"]}>
      <div className={classes.headers}>
        <div className={classes.header}>
          <button className={classes.backward} onClick={() => navigate("..")}>
            <BackwardArrowIcon />
          </button>
          <div className={classes["main-header"]}>
            <h1 className={classes["main-header-text"]}>
              Read {page.pageTitle}
            </h1>
            <div className={classes["main-header-line"]}></div>
          </div>
        </div>
        <div className={classes.version}>
          <FilterVersion
            currentIteration={selectedIteration.iteration} // Pass the current iteration
            uniqueVersions={uniqueVersions} // Pass unique versions
            onFilterChange={handleFilterChange} // Update iteration on selection
          />
        </div>
        <div className={classes["button-container"]}>
          <button
            className={classes["create-button"]}
            onClick={() =>
              navigate(
                `/system-config/apgspptscp/update-apgspptscp/${pageId}`,
                { replace: true }
              )
            }
          >
            Create new {page.pageTitle}
          </button>
        </div>
      </div>
      <div className={classes["rich-text-editor"]}>
        <div
          dangerouslySetInnerHTML={{
            __html: selectedIteration?.content || "<p>No content available</p>",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ReadAPGSPPTSCP;
