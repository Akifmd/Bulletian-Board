import React from "react";
import "./footer.css";

const date = new Date();

const year = date.getFullYear();

export const Footer = () => {
  return (
    <>
      <center>
        <div> &copy; {year} All Rights Reserved</div>
      </center>
    </>
  );
};
