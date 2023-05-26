import React from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  let navigate = useNavigate();

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/login`, data);
      if (request.data.statusCode === 200) {
        randomData();
      }
      if (request.data.statusCode === 404) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const randomData = async () => {
    let periods = [
      "PRI-4A",
      "FSI-4A",
      "PR3-4A",
      "ICD-4A",
      "PR2-4A",
      "SEM-4A",
      "LIB-4A",
      "TWM",
      "PR4-4A",
    ];
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];

    for (let i = 0; i < 8; i++) {
      monday.push(periods[Math.floor(Math.random() * periods.length)]);
      tuesday.push(periods[Math.floor(Math.random() * periods.length)]);
      wednesday.push(periods[Math.floor(Math.random() * periods.length)]);
      thursday.push(periods[Math.floor(Math.random() * periods.length)]);
      friday.push(periods[Math.floor(Math.random() * periods.length)]);
    }
    if (friday.length > 0) {
      try {
        let result = await axios.put(
          `${url}/re-generate`,
          {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
          },
          {}
        );
        if (result.data.statusCode === 200) {
          alert(result.data.message);
          navigate("/dashboard");
        }
        if (result.data.statusCode === 404) {
          alert(result.data.message);
        }
        if (result.data.statusCode === 500) {
          alert(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
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
          <h1>ADMIN</h1>
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
          <div className="form-groups">
            <label htmlFor="name">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-controls"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-groups">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
          <div>
            <a href="/verify/email" className="forgot-container">
              Forgot password
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
