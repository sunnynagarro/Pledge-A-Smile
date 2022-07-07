import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

// api actions
import { updateUserPassword } from "../actions/userAuth";

// icons
import { MdOutlineLock, MdRemoveRedEye } from "react-icons/md";

// logo
import Logo from "../assets/logo.png";

function ResetPassword() {
  let { resetPasswordToken } = useParams();
  const [passFieldType, setPassFieldType] = useState("password");
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let password = formData.get("password");
    let data = await updateUserPassword({ password, resetPasswordToken });
    if (data.success === true) {
      toast.success("password updated");
    } else {
      toast.error(data.error);
    }
  };

  const togglePassFieldType = () => {
    if (passFieldType === "password") {
      setPassFieldType("email");
    } else {
      setPassFieldType("password");
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center">
      <Link to="/">
        <img src={Logo} alt="Pledge a smile" className="w-[320px] mb-8" />
      </Link>
      <form
        className="max-w-[400px] w-full mt-8 space-y-3"
        onSubmit={handleFormSubmit}
      >
        <div className="flex space-x-3 border border-slate-300 p-4 rounded-sm">
          <MdOutlineLock fontSize={28} />
          <input
            type={passFieldType}
            name="password"
            placeholder="New password"
            className="outline-none flex-1"
            autoComplete="false"
            required
          />
          <MdRemoveRedEye
            fontSize={28}
            className="cursor-pointer"
            onClick={togglePassFieldType}
          />
        </div>
        <button
          type="submit"
          className="p-4 bg-blue-600 w-full rounded-sm text-white"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
