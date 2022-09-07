import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";

// context
import UserContext from "../context/UserContext";

// api actions
import { emailLogin, socialLogin, forgotPassword } from "../actions/userAuth";

// icons
import { FcGoogle } from "react-icons/fc";
import {
  MdEmail,
  MdAlternateEmail,
  MdOutlineLock,
  MdRemoveRedEye,
} from "react-icons/md";
import { GrFacebook } from "react-icons/gr";
import { toast } from "react-toastify";

// logo
import Logo from "../assets/logo.png";

// configs
import { FACEBOOK_APP_ID } from "../config";

function LoginPage() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [view, setView] = useState("");
  const [passFieldType, setPassFieldType] = useState("password");
  const { user, dispatch } = useContext(UserContext);
  useEffect(() => {
    if (user._id) {
      navigate("/");
    }
  });

  const responseGoogle = async (event) => {
    console.log(event.toString());
    if (event.access_token) {
      try {
        let response = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
            event.access_token
        );
        response = await response.json();
        if (response.name && response.email) {
          let referralId = query.get("referralId");
          let data = await socialLogin({
            email: response.email,
            name: response.name,
            referralId,
          });
          if (data.success === true) {
            localStorage.setItem("jwt-token", data.token);
            if (data.user.referrals) {
              data.user.referrals = JSON.parse(data.user.referrals);
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({
              type: "SET_USER",
              payload: {
                user: data.user,
              },
            });
            navigate("/");
          } else {
            toast.error("Google Authentication Failed");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Google Authentication Failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
  });

  const responseFacebook = async (event) => {
    if (event.accessToken) {
      try {
        let response = await fetch(
          "https://graph.facebook.com/me?fields=name,email&access_token=" +
            event.accessToken
        );
        response = await response.json();
        if (response.email && response.id && response.name) {
          let referralId = query.get("referralId");
          let data = await socialLogin({
            email: response.email,
            name: response.name,
            referralId,
          });
          if (data.success === true) {
            localStorage.setItem("jwt-token", data.token);
            if (data.user.referrals) {
              data.user.referrals = JSON.parse(data.user.referrals);
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({
              type: "SET_USER",
              payload: {
                user: data.user,
              },
            });
            navigate("/");
          } else {
            toast.error(data.error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Facebook authentication failed");
    }
  };
  const loginButtonsView = () => {
    return (
      <div className="flex flex-col space-y-4 max-w-[400px] w-full">
        <button
          className="login-btn py-[15px] border border-slate-500 text-slate-500"
          onClick={() => googleLogin()}
        >
          <FcGoogle fontSize={26} />
          <span>Sign in with Google</span>
        </button>
        <div className="login-btn py-4 bg-facebookButton text-white">
          <GrFacebook fontSize={26} />
          {/* <span>Sign in with Facebook</span> */}
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            onSuccess={responseFacebook}
            onFail={responseFacebook}
            scope="public_profile,email"
          />
        </div>
        <button
          className="login-btn py-4 bg-emailButton text-white"
          onClick={() => setView("email")}
        >
          <MdEmail fontSize={26} />
          <span>Sign in with Email</span>
        </button>
      </div>
    );
  };

  const changePassFieldType = () => {
    if (passFieldType === "password") {
      setPassFieldType("text");
    } else {
      setPassFieldType("password");
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let referralId = query.get("referralId");
    const data = await emailLogin({ email, password, referralId });
    if (data.success === false) {
      toast.error(data.error);
    } else {
      localStorage.setItem("jwt-token", data.token);
      if (data.user.referrals) {
        data.user.referrals = JSON.parse(data.user.referrals);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
        },
      });
      navigate("/");
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let data = await forgotPassword(email);
    if (data.success === true) {
      toast.success(data.message);
      event.target.reset();
    } else {
      toast.error(data.error);
    }
  };

  const emailLoginView = () => {
    return (
      <div className="flex flex-col space-y-4 max-w-[400px] w-full">
        <form className="space-y-3" onSubmit={handleEmailLogin}>
          <div className="flex space-x-3 border border-slate-300 p-4 rounded-sm">
            <MdAlternateEmail fontSize={22} />
            <input
              type="email"
              name="email"
              placeholder="Enter you email address"
              className="outline-none flex-1"
              autoComplete="username"
              required
            />
          </div>
          <div className="flex space-x-3 border border-slate-300 p-4 rounded-sm">
            <MdOutlineLock fontSize={22} />
            <input
              type={passFieldType}
              name="password"
              placeholder="Enter your password"
              className="outline-none flex-1"
              autoComplete="current-password"
              required
            />
            <MdRemoveRedEye
              fontSize={22}
              className="cursor-pointer"
              onClick={changePassFieldType}
            />
          </div>
          <button
            type="submit"
            className="p-4 bg-blue-600 text-white w-full rounded-sm"
          >
            Login
          </button>
          <button
            className="text-blue-600"
            onClick={() => setView("forgotPassword")}
          >
            Forgot Password?
          </button>
        </form>
        <button
          className="p-4 bg-slate-200 w-full rounded-sm mt-3"
          onClick={() => setView("")}
        >
          Back
        </button>
      </div>
    );
  };

  const forgotPasswordView = () => {
    return (
      <div className="flex flex-col space-y-4 max-w-[400px] w-full">
        <form className="space-y-3" onSubmit={handleForgotPassword}>
          <p>
            A temporary password will be sent to your email. You can reset the
            password later in your profile settings
          </p>
          <div className="flex space-x-3 border border-slate-300 p-4 rounded-sm">
            <MdAlternateEmail fontSize={22} />
            <input
              type="email"
              name="email"
              placeholder="Enter you email address"
              className="outline-none flex-1"
              autoComplete="false"
              required
            />
          </div>
          <button
            className="p-4 bg-blue-600 w-full rounded-sm text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button
          className="p-4 bg-slate-200 w-full rounded-sm mt-3"
          onClick={() => setView("email")}
        >
          Back
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center">
      <img src={Logo} alt="Pledge a smile" className="w-[320px] mb-8" />
      {view === "" && loginButtonsView()}
      {view === "email" && emailLoginView()}
      {view === "forgotPassword" && forgotPasswordView()}
    </div>
  );
}

export default LoginPage;
