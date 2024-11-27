import React from "react";
import { MoonLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="spinner">
      <MoonLoader color={"#ffffff"} loading={loading} size={25} />
    </div>
  );
};

export default Spinner;
