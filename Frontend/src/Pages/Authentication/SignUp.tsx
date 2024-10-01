import React from "react";
import "../../Components/Navbar/Navbar.css";
import "../../index.css";
import { gsap } from "gsap";
import facebook from "../../assets/static_files/logos_facebook.svg";
import google from "../../assets/static_files/devicon_google.png";
import axios from "axios";
import TextField from "@mui/material/TextField"; // Import TextField
import { useDispatch } from "react-redux";
import { AuthenticationActions } from "../../Store/Authentcation";
const SignUp = () => {
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = React.useState<{
    email: string;
    password: string;
    re_password: string;
    name: string;
  }>({ email: "", password: "", re_password: "", name: "" });

  const [signInData, setSignInData] = React.useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup_backend(signUpData);
  };
  const handleSubmitSignIN = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn_backend(signInData);
  };

  const signup_backend = async (data: {
    email: string;
    name: string;
    password: string;
    re_password: string;
  }): void => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(data);

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/users/`,
        body,
        config,
      );
      if (res.status === 201) {
        dispatch(
          AuthenticationActions.newUserCreatedRed({
            created: true,
            activated: false,
          }),
        );
      }

      // dispatch({
      //   type: SIGNUP_SUCCESS,
      //   payload: res.data,
      // });
    } catch (err) {
      //   dispatch({
      //     type: SIGNUP_FAIL,
      //   });
      // }
    }
  };

  const signIn_backend = async (data: {
    email: string;
    password: string;
  }): void => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(data);

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/jwt/create/`,
        body,
        config,
      );
      if (res.status === 200) {
        dispatch(
          AuthenticationActions.newUserLogInRed({
            success: true,
            loaded: false,
          }),
        );
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);

        Load_User();
      }
      // dispatch({
      //          type: LOGIN_SUCCESS,
      //          payload: res.data
      //      });

      //      dispatch(load_user());
    } catch (err) {
      // dispatch({
      //     type: LOGIN_FAIL
      // })
    }
  };
  const Load_User = async () => {
    if (localStorage.getItem("access_token")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `http://localhost:8000/auth/users/me/`,
          config,
        );
        if (res.status === 200) {
          dispatch(
            AuthenticationActions.newUserLogInRed({
              success: true,
              loaded: true,
            }),
          );
        }
        console.log("user data", res);
        // dispatch({
        //     type: USER_LOADED_SUCCESS,
        //     payload: res.data
        // });
      } catch (err) {
        // dispatch({
        //     type: USER_LOADED_FAIL
        // });
      }
    } else {
      // dispatch({
      //     type: USER_LOADED_FAIL
      // });
    }
  };

  const [animationSigning, setAnimationsSigning] = React.useState<string>("");
  React.useEffect(() => {
    if (animationSigning === "signup_animation") {
      const signupTimeline = gsap.timeline();
      signupTimeline
        .to("#sign-in", {
          duration: 0.5,
          display: "none",
          ease: "power1.inOut",
          opacity: 0,
        })
        .to("#circular-div", {
          left: 850, // Ensure left is auto
          right: "auto",
          duration: 1.3,
          ease: "expo.out",
        })
        .to(
          "#sign-up",
          {
            duration: 0.6,
            display: "block",
            ease: "power1.inOut",
            opacity: 1,
          },
          ">",
        )
        .to(
          "#sigup-circular",
          {
            duration: 0.0,
            display: "hidden",
            ease: "power1.inOut",
            opacity: 0,
            width: "0%",
            height: "0%",
            overflow: "hidden",
          },
          ">",
        )
        .to(
          "#sigin-circular",
          {
            duration: 0.0,
            display: "flex",
            ease: "power1.inOut",
            opacity: 1,
            width: "100%",
            height: "100%",
          },
          ">",
        );
    } else if (animationSigning === "signin_animation") {
      const signinTimeline = gsap.timeline();
      signinTimeline
        .to("#sign-up", {
          duration: 0.6,
          display: "hidden",
          ease: "power1.inOut",
          opacity: 0,
          overflow: "hidden",
        })
        .to("#circular-div", {
          right: "auto", // Reset right to auto
          left: 20,
          duration: 1.3,
          ease: "expo.out",
        })
        .to(
          "#sigin-circular",
          {
            duration: 0.0,
            display: "hidden",
            ease: "power1.inOut",
            opacity: 0,
            width: "0%",
            height: "0%",
            overflow: "hidden",
          },
          ">",
        )
        .to(
          "#sigup-circular",
          {
            duration: 0.0,
            display: "flex",
            ease: "power1.inOut",
            opacity: 1,
            width: "100%",
            height: "100%",
          },
          ">",
        )
        .to("#sign-in", {
          duration: 0.5,
          display: "block",
          ease: "power1.inOut",
          opacity: 1,
        });
    }
  }, [animationSigning]);
  return (
    <React.Fragment>
      <div className="w-full h-screen background-signup flex items-center justify-start relative">
        <div
          id="circular-div"
          className={` w-1/2 h-[95%] rounded-r-[10%] flex items-center justify-center welcome-side-signup ml-10 absolute z-50 top-7 left-6 right-auto`}
        >
          <div
            id="sigup-circular"
            className="h-full  flex flex-col text-center font-lexend text-[#C3C3C3] items-center justify-center gap-6"
          >
            <span className="text-8xl text-shadow-heading font-bold">
              Hello Friend!
            </span>
            <span className="text-2xl text-shadow-heading ">
              Register to start you typing practice!
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
              className="w-32 h-16 text-2xl text-shadow border-[#1976D2] border-4 rounded-2xl text-shadow bg-transparent text-white z-100"
              onClick={() => {
                setAnimationsSigning("signup_animation");
              }}
            >
              Sign Up
            </button>
          </div>

          <div
            id="sigin-circular"
            className="h-full opacity-0 hidden flex flex-col text-center font-lexend text-[#C3C3C3] items-center justify-center gap-6"
          >
            <span className="text-8xl text-shadow-heading font-bold">
              Welcome Back!
            </span>
            <span className="text-2xl text-shadow-heading ">
              Sign in to continue your typing practice!
            </span>
            <button
              id="hover-animation-sigin"
              onMouseEnter={() => {
                gsap.to("#hover-animation-sigin", {
                  scale: 1.15,
                  duration: 0.6,
                  border: "none",
                  background:
                    "linear-gradient(99.98deg,#001e86 4.09%,#5c0094 52.77%,#980092 104.46%)",
                  ease: "power1.inOut",
                });
              }}
              onMouseLeave={() => {
                gsap.to("#hover-animation-sigin", {
                  scale: 1,
                  duration: 0.6,
                  borderColor: "#1976D2", // Set border color
                  borderWidth: "4px", // Set border width
                  borderStyle: "solid",
                  background: "transparent",
                  ease: "power1.inOut",
                });
              }}
              onClick={() => {
                setAnimationsSigning("signin_animation");
              }}
              className="w-32 h-16 text-2xl text-shadow border-[#1976D2] border-4 rounded-2xl text-shadow bg-transparent text-white z-100"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className={`w-1/2  `}>
          <div id="sign-up" className={`w-full hidden opacity-0`}>
            <div className="text-center font-lexend text-white flex flex-col items-center justify-center gap-4">
              <span className="text-2xl text-shadow-heading">Sign up with</span>
              <div className="flex gap-4">
                <img src={facebook} alt="Facebook" />
                <img src={google} alt="Google" />
              </div>
              <span className="text-2xl text-shadow-heading or-lines">or</span>
            </div>

            <div className="flex flex-col text-white items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-0 mt-4 w-full">
                  <TextField
                    id="email"
                    label="Email"
                    value={signUpData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSignUpData((previousValue) => ({
                        ...previousValue,
                        email: e.target.value,
                      }));
                    }}
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

                <div className="mb-4 mt-4 w-full">
                  <TextField
                    id="name"
                    label="Full Name"
                    value={signUpData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSignUpData((previousValue) => ({
                        ...previousValue,
                        name: e.target.value,
                      }));
                    }}
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
                    value={signUpData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSignUpData((previousValue) => ({
                        ...previousValue,
                        password: e.target.value,
                      }));
                    }}
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
                    id="confirm-password"
                    label="confirm password"
                    type="password"
                    value={signUpData.re_password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSignUpData((previousValue) => ({
                        ...previousValue,
                        re_password: e.target.value,
                      }));
                    }}
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
                  id="sign-up-btn"
                  onMouseEnter={() => {
                    gsap.to("#sign-up-btn", {
                      scale: 1.15,
                      duration: 0.4,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to("#sign-up-btn", {
                      scale: 1,
                      duration: 0.4,

                      ease: "power1.inOut",
                    });
                  }}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded "
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-1/2 ">
          <div className="w-full " id="sign-in">
            <div className="text-center font-lexend text-white flex flex-col items-center justify-center gap-4">
              <span className="text-2xl text-shadow-heading">Sign in with</span>
              <div className="flex gap-4">
                <img src={facebook} alt="Facebook" />
                <img src={google} alt="Google" />
              </div>
              <span className="text-2xl text-shadow-heading or-lines">or</span>
            </div>

            <div className="flex flex-col text-white items-center justify-center">
              <form
                onSubmit={handleSubmitSignIN}
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-4 mt-4 w-full">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={signInData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSignInData((previousValue) => ({
                        ...previousValue,
                        email: e.target.value,
                      }));
                    }}
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
                    value={signInData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSignInData((previousValue) => ({
                        ...previousValue,
                        password: e.target.value,
                      }));
                    }}
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
                  <button type="button">Forgot Your password ?</button>
                </div>

                <button
                  id="sign-in-btn"
                  onMouseEnter={() => {
                    gsap.to("#sign-in-btn", {
                      scale: 1.15,
                      duration: 0.4,

                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to("#sign-in-btn", {
                      scale: 1,
                      duration: 0.4,

                      ease: "power1.inOut",
                    });
                  }}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded "
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
