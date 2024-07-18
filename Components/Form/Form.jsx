import React from "react";

import { FormSVG, Lock } from "../SVG/index";
import style from "./Form.module.css";
import { CheckBox } from "../index";

const Form = ({
  setFile,
  setDisplay,
  handleFormFieldChange,
  handleSubmit,
  // setCategory,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card2}>
        <form className={style.form}>
          <p id="heading" className={style.heading}>
            Upload Image Deatils
          </p>

          <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="text"
              className={style.input_field}
              placeholder="Title"
              autoComplete="off"
              onChange={(e) => handleFormFieldChange("title", e)}
            />
          </div>

          <div className={style.field}>
            <Lock styleClass={style.input_icon} />
            <textarea
              className={`${style.textarea} ${style.input_field}`}
              placeholder="Description"
              onChange={(e) => handleFormFieldChange("description", e)}
            ></textarea>
          </div>

          {/* <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="text"
              className={style.input_field}
              placeholder="Certificate ID"
              onChange={(e) => handleFormFieldChange("certificateID", e)}
            />
          </div> */}

          <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="email"
              className={style.input_field}
              placeholder="User Email"
              onChange={(e) => handleFormFieldChange("userEmail", e)}
            />
          </div>

          <div className={style.field}>
            <FormSVG styleClass={style.input_icon} />
            <input
              type="text"
              className={style.input_field}
              placeholder="Organisation"
              onChange={(e) => handleFormFieldChange("organisation", e)}
            />
          </div>

          {/* <p className={style.second}>Category</p>

          <div className={style.category}>
            {categories.map((category, index) => (
              <CheckBox
                setCategory={setCategory}
                key={index + 1}
                category={category}
              />
            ))}
          </div> */}

          <div className={style.btn}>
            <button
              className={style.button1}
              onClick={() => (setFile(null), setDisplay(null))}
            >
              &nbsp; &nbsp; &nbsp; Close &nbsp; &nbsp; &nbsp;
            </button>

            {/* <button className={style.button2}>Sign Up</button> */}
          </div>

          <button onClick={(e) => handleSubmit(e)} className={style.button3}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
