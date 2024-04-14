import axios from "axios";
import React from "react";
import "./custom-button.scss";

const CustomButton = ({ userGuideId, guideCompleted, refetch, refetchData }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const animateButton = async () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
    await axios.post(`user-guides/${userGuideId}/read`);
    refetch();
    refetchData()
  };

  return (
    <div className="text-center">
      <button
        disabled={guideCompleted}
        className={`btn submit-habit ${isAnimating ? "onclick" : ""}`}
        id="submit-habit"
        onClick={animateButton}
      >
        {!isAnimating ? (
          <span className="text-white">
            {guideCompleted ? "Completed" : "Not Completed"}
          </span>
        ) : null}
        <span
          className={`checkmark ${
            isAnimating ? "hide flex justify-center" : ""
          }`}
          id="submit-habit-checkmark"
        >
          <svg viewBox="0 0 24 24">
            <polyline
              className="path"
              fill="none"
              points="4,12 9,17 20,6"
              stroke="#fff"
              strokeWidth="3"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default CustomButton;
