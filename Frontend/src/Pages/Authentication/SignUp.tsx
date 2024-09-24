import React from "react";
import "../../Components/Navbar/Navbar.css";
import "../../index.css";
import { gsap } from "gsap";
import facebook from "../../assets/static_files/logos_facebook.svg";
import google from "../../assets/static_files/devicon_google.png";

import TextField from "@mui/material/TextField"; // Import TextField

const SignUp = () => {
  const handleSubmit = () => {};

  return (
    <React.Fragment>
      <div className="w-full h-screen background-signup flex items-center justify-start">
        <div
          className={`w-1/2 h-[95%] rounded-r-[10%] flex items-center justify-center welcome-side-signup ml-10`}
        >
          <div className="h-full flex flex-col text-center font-lexend text-[#C3C3C3] items-center justify-center gap-6">
            <span className="text-8xl text-shadow-heading font-bold">
              Welcome Back!
            </span>
            <span className="text-2xl text-shadow-heading ">
              Sign in to continue your typing practice!
            </span>
            <button
              id="hover-animation-sigup"
              onMouseEnter={() => {
                gsap.to("#hover-animation-sigup", {
                  scale: 1.15,
                  duration: 0.6,
                  border: "none",
                  background:
                    "linear-gradient(99.98deg,#001e86 4.09%,#5c0094 52.77%,#980092 104.46%)",
                  ease: "power1.inOut",
                });
              }}
              onMouseLeave={() => {
                gsap.to("#hover-animation-sigup", {
                  scale: 1,
                  duration: 0.6,
                  borderColor: "#1976D2", // Set border color
                  borderWidth: "4px", // Set border width
                  borderStyle: "solid",
                  background: "transparent",
                  ease: "power1.inOut",
                });
              }}
              className="w-32 h-16 text-2xl text-shadow border-[#1976D2] border-4 rounded-2xl text-shadow bg-transparent text-white"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="w-1/2 border-2">
          <div className="text-center font-lexend text-white flex flex-col items-center justify-center gap-4">
            <span className="text-2xl text-shadow-heading">Sign in with</span>
            <div className="flex gap-4">
              <img src={facebook} alt="Facebook" />
              <img src={google} alt="Google" />
            </div>
            <span className="text-2xl text-shadow-heading or-lines">or</span>
          </div>

          <div className="flex flex-col text-white items-center justify-center">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 mt-4">
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    input: {
                      backgroundColor: "transparent",
                      color: "white",
                    },
                    label: { color: "#C3C3C3" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#C3C3C3",
                      },
                      "&:hover fieldset": {
                        borderColor: "#007bff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976D2",
                      },
                    },
                  }}
                />
              </div>

              <div className="mb-4">
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  sx={{
                    input: {
                      backgroundColor: "transparent",
                      color: "white",
                    },
                    label: { color: "#C3C3C3" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#C3C3C3",
                      },
                      "&:hover fieldset": {
                        borderColor: "#007bff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976D2",
                      },
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
