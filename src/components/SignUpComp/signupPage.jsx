import React, { useState, useContext } from "react";
import "./signupPage.css";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../HelperComp/localeContextProvider";
import GET_SIGNUP_CONTENT from "./graphql";

const SignupPage = () => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const { loading, error, data } = useQuery(GET_SIGNUP_CONTENT, {
    variables: { locale },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (field) => {
    const errors = {};

    switch (field) {
      case "firstName":
        if (!formData[field].trim()) {
          errors[field] = "First Name is required";
        }
        break;
      case "lastName":
        if (!formData[field].trim()) {
          errors[field] = "Last Name is required";
        }
        break;
      case "email":
        if (!formData[field].trim()) {
          errors[field] = "Email is required";
        } else if (!isValidEmail(formData[field])) {
          errors[field] = "Invalid email format";
        }
        break;
      case "password":
        if (!formData[field].trim()) {
          errors[field] = "Password is required";
        } else if (formData[field].length < 10) {
          errors[field] = "Password must be at least 10 characters";
        } else if (!isValidPassword(formData[field])) {
          errors[field] =
            "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
        }
        break;
      case "confirmPassword":
        if (!formData.password.trim()) {
          errors[field] = "";
        } else if (!formData[field].trim() || formData.password !== formData[field]) {
          errors[field] = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    return errors;
  };

  const handleBlur = (field) => {
    const errors = validateField(field);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errors[field] || "",
    }));

    if (field === "password" && !formData.password.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((field) => {
      const fieldErrors = validateField(field);
      if (Object.keys(fieldErrors).length > 0) {
        errors[field] = fieldErrors[field];
      }
    });
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/customers`,
        formData
      );
      console.log(response);
      navigate("/signin");
    } catch (error) {
      console.error("Registration process failed");
      console.error(error);
      setResponseMsg(error.response.data.error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.signUpCollection || !data.signUpCollection.items.length) {
    return <p>No data available</p>;
  }

  const { logo, signUp, signUpDescription, signUpData } =
    data.signUpCollection.items[0];

  return (
    <div className="signupMainContainer">
      <div className="signupPage">
        <div className="sections">
          <div className="section1">
            <img src={logo[0].url} alt="logo" />
            <h3>{signUp}</h3>
            <p>{signUpDescription}</p>
          </div>
          <div className="section2">
            <div className="fullNameContainer">
              <input
                className={formErrors.firstName ? "inputError" : ""}
                name="firstName"
                type="text"
                placeholder={signUpData.firstnamePlaceholder}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
              />
              <input
                className={formErrors.lastName ? "inputError" : ""}
                name="lastName"
                type="text"
                placeholder={signUpData.lastnamePlaceholder}
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
              />
            </div>
            <input
              className={formErrors.email ? "inputError" : ""}
              name="email"
              type="email"
              autoComplete="off"
              placeholder={signUpData.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
            />
            <div className="passwordDiv">
              <input
                className={formErrors.password ? "inputError" : ""}
                name="password"
                type="password"
                value={formData.password}
                placeholder={signUpData.passwordPlaceholder}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
              />
              <span className="passwordHintDiv">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="passwordHintIcon"
                  color="black"
                  size="xl"
                />
                <span className="passwordHintIconTooltip">
                  Your password must contain at least:
                  <ul>
                    <li>1 lowercase alphabet</li>
                    <li>1 uppercase alphabet</li>
                    <li>1 special character</li>
                    <li>1 number</li>
                    <li>Minimum 10 characters</li>
                  </ul>
                </span>
              </span>
            </div>
            <div className="confirmPasswordInputContainer">
              <input
                className={formErrors.confirmPassword ? "inputError" : ""}
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder={signUpData.confirmPasswordPlaceholder}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                disabled={!formData.password.trim()}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="passwordToggleIcon"
                onClick={() => setShowPassword(!showPassword)}
              />
              <p className="errorText">
                {formErrors.confirmPassword}
                {responseMsg}
              </p>
            </div>
            <div className="signupScreenButtons">
              <button
                className="alreadyregisteredBtn"
                onClick={() => navigate("/signin")}
              >
                {signUpData.alreadyHaveAccount}
              </button>
              <button className="cancelBtn" onClick={() => navigate("/")}>
                {signUpData.cancelBtn}
              </button>
              <button className="signupBtn" onClick={handleSignUp}>
                {signUpData.signupBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
