import React, { useState, useContext } from "react";
import axios from "axios";
import "./signinPage.css";
import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../HelperComp/localeContextProvider";
import GET_SIGNIN_CONTENT from "./graphql";

const SigninPage = () => {
  const { locale, handleAuthChange } = useContext(LocaleContext);
  const { loading, error, data } = useQuery(GET_SIGNIN_CONTENT, {
    variables: { locale },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("REACT_APP_BACKEND_URL: ", REACT_APP_BACKEND_URL);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors(""); // Clear errors when the user starts typing
  };

  const handleSignInClick = async () => {
    if (!email || !password) {
      setErrors("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/login`, {
        email,
        password,
      });
      const data = response.data;
      // setMessage(data.message);
      localStorage.setItem("customer", data.customerId);
      localStorage.setItem("loggedIn", "true");
      handleAuthChange();
      navigate("/product-list");
    } catch (error) {
      console.log(error.response.data.error);
      setErrors(error.response.data.error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.loginCollection || !data.loginCollection.items.length) {
    return <p>No data available</p>;
  }

  const { logo, signIn, signInDescription, loginData } =
    data.loginCollection.items[0];

  return (
    <div className="loginMainContainer">
      <div className="loginPage">
        <img src={logo[0].url} alt="logo" />
        <div className="sections">
          <div className="section1">
            <h3>{signIn}</h3>
            <p>{signInDescription}</p>
          </div>
          <div className="section2">
            <input
              className={`emailInput ${errors ? "inputError" : ""}`}
              name="email"
              type="email"
              placeholder={loginData.emailPlaceholder}
              value={email}
              onChange={handleInputChange(setEmail)}
              autoComplete="on"
            />
            <div className="passwordInputContainer">
              <input
                className={`passwordInput ${errors ? "inputError" : ""}`}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={loginData.passwordPlaceholder}
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="passwordToggleIcon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="btnError">
              <button className="forgotPasswordButton">
                {loginData.forgotPasswordBtn}
              </button>
              <p className="signInError">{errors}</p>
            </div>
            <div className="loginScreenButtons">
              <button
                className="registerButton"
                onClick={() => navigate("/signup")}
              >
                {loginData.registerBtn}
              </button>
              <button className="loginButton" onClick={handleSignInClick}>
                {loginData.loginBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
