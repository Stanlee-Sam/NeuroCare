import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ScatterBoxLoaderComponent from "./ScatterBoxLoader.jsx";

const PageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Show loader for 1 sec
  }, []);

  return <>{loading ? <ScatterBoxLoaderComponent /> : children}</>;
};
PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;

