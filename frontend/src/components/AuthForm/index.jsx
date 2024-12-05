import { useForm } from "react-hook-form";
import "./style.scss";
import { useState, useEffect } from "react";
import usernameImg from "../../assets/authIcons/username.png";
import idcard from "../../assets/authIcons/id-card.png";
import padlock from "../../assets/authIcons/padlock.png";
import passwordImg from "../../assets/authIcons/password.png";
import axios from "axios";

const AuthForm = () => {
  const [action, setAction] = useState("Login");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //form submit olanda
  const signUpHandle = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        data
      );
      console.log(response.data);
      console.log(response.cookies);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loginHandle = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      console.log(response.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="authForm-wrapper">
      <div className="wrapper">
        <form
          action=""
          onSubmit={handleSubmit(
            action === "Login" ? loginHandle : signUpHandle
          )}
        >
          <div className="heading">
            <h1>{action}</h1>
          </div>

          <div className="inputs">
            {action !== "Login" && (
              <div className="input">
                <img src={idcard} alt="" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your fullname"
                  {...register("fullname", {
                    required: true,
                  })}
                />
                {errors.fullname && errors.fullname.type === "required" && (
                  <span>bu xanani doldur</span>
                )}
              </div>
            )}

            <div className="input">
              <img src={usernameImg} alt="" />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && errors.username.type === "required" && (
                <span>bu xanani doldur</span>
              )}
            </div>

            <div className="input">
              <img src={padlock} alt="" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <span>bu xanani doldur</span>
              )}
            </div>

            {action !== "Login" && (
              <>
                <div className="input">
                  <img src={passwordImg} alt="" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: true,
                    })}
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "required" && (
                      <span>bu xanani doldur</span>
                    )}
                </div>

                <select
                  name="gender"
                  {...register("gender", {
                    required: true,
                  })}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>

                {errors.gender && errors.gender.type === "required" && (
                  <span>bu xanani doldur</span>
                )}
              </>
            )}
          </div>

          <div className="buttons">
            <button
              type="button"
              className={action === "Login" ? "active" : "notActive"}
              onClick={() => setAction("Login")}
            >
              Login
            </button>
            <button
              type="button"
              className={action === "Login" ? "notActive" : "active"}
              onClick={() => setAction("Signup")}
            >
              Sign Up
            </button>
          </div>
          <button id="registrationButton" type="submit">
            Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
