import PropTypes from "prop-types";

const StressProgressBar = ({ stressPercentage }) => {
  const getColor = (percentage) => {
    if (percentage >= 70) return "bg-red-600"; 
    if (percentage >= 40) return "bg-yellow-500"; 
    return "bg-green-500"; 
  };

  return (
    <div className="progress-bar bg-gray-300 h-[15px] rounded-lg w-full overflow-hidden">
      <div
        className={`${getColor(stressPercentage)} h-full rounded-lg transition-all duration-500 ease-in-out`}
        style={{ width: `${stressPercentage}%` }}
      ></div>
    </div>
  );
};
StressProgressBar.propTypes = {
  stressPercentage: PropTypes.number.isRequired,
};

export default StressProgressBar;

