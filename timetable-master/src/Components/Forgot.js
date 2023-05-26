import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Forgot() {
  let navigate = useNavigate();
  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");
  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/reset-email-verify`, data);
      setMessages(request.data.message);
      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        setColor("green");
        setTimeout(() => {
          navigate(`/verify/otp/email/${data.email}`);
        }, "3000");
      }

      if (request.data.statusCode === 404) {
        setTimeout(() => {
          navigate("/signup");
        }, "3000");
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <div className="forms">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <br />
          <h1>Verify Email</h1>
          <br />
          <div className="form-groups">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-controls"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          {ActiveResponse ? (
            <div style={{ color: isColor }}>{Messages}</div>
          ) : null}
          <div className="form-groups">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
          OR
          <div>
            <p>
              Bact to{" "}
              <a href="/admin/credentials" className="sign-container">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forgot;
