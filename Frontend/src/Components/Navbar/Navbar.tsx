import React, { useState, useEffect } from "react";
import keyboardLogo from "../../assets/static_files/Keyboard-logo.svg";
import "./Navbar.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
const detailButtonsName: string[] = ["Home", "Practice", "Contact"];
const detailButtonsClass: string[] = [
  "w-0  check overflow-hidden h-10  flex items-center justify-center  buttons-background rounded-lg font-inter font-bold cursor-pointer  duration-300 box-shadow",
  "text-white ",
];
import menuIcon from "../../assets/static_files/MenuIcon.svg";
function Navbar() {
  const [mobileDetailButtons, setMobileDetailButtons] = useState<
    null | boolean
  >(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useGSAP(() => {
    if (hasMounted) {
      if (mobileDetailButtons) {
        gsap.to(".check", {
          duration: 0.1,
          width: 100,
          height: 50,
          opacity: 1,
          stagger: 0.2,
        });
      } else {
        gsap.to(".check", {
          duration: 0.1,
          width: 0,
          height: 0,
          opacity: 0,
          stagger: 0.2,
        });
      }
    }
  }, [mobileDetailButtons]);

  return (
    <React.Fragment>
      <div
        className=" w-screen h-20  flex items-center  justify-between box-shadow  rounded-2xl fixed top-0 backdrop-blur-lg bg-black/8 z-100"
        onMouseLeave={() => {
          setMobileDetailButtons(false);
        }}
      >
        <div className="m-10 w-72  flex gap-3  ">
          {" "}
          <img
            className="box-shadow cursor-pointer w-[40%]"
            src={keyboardLogo}
            alt="RapidType"
            title="Rapid Type"
          />{" "}
          <div className=" w-[65%] text-2xl font-lexend text-[#C3C3C3] font-bold text-center cursor-pointer">
            Rapid Type
          </div>
        </div>

        <div className="hidden xl:font-lexend xl:text-[#C3C3C3] xl:flex xl:gap-6 xl:font-bold 2xl:gap-20  ">
          <div className="cursor-pointer gradient-border-bottom ">Home</div>
          <div className="cursor-pointer">Practice</div>
          <div className="cursor-pointer">Contact</div>
        </div>

        <div className=" flex items-center   w-[30%] lg:w-[50%] xl:w-[30%] justify-evenly xl:justify-center xl:gap-6 relative  ">
          <div
            className="hidden md:flex md:w-36 md:h-12 items-center justify-center gradient-border
                        md:rounded-lg font-inter md:font-bold md:cursor-pointer hover:text-xl duration-300 box-shadow"
          >
            <div className="text-white ">Login</div>
          </div>{" "}
          <div
            className="hidden lg:flex lg:w-36 lg:h-12 items-center justify-center gradient-border
                        lg:rounded-lg font-inter lg:font-bold lg:cursor-pointer hover:text-xl duration-300 box-shadow"
          >
            <div className="text-white">Get Started</div>
          </div>
          <div
            id="detail-box"
            className="text-2xl cursor-pointer xl:hidden"
            onClick={() => {
              setMobileDetailButtons(true);
            }}
            onMouseEnter={() => {
              setMobileDetailButtons(true);
            }}
          >
            <img width="40" src={menuIcon} alt="" />
          </div>
          <div
            className="absolute  right-12 top-12 flex gap-5"
            onMouseLeave={() => {
              setMobileDetailButtons(false);
            }}
          >
            {detailButtonsName.map((names, index) => {
              return (
                <div
                  id={`button-${index}`}
                  onMouseEnter={() => {
                    gsap.to(`#button-${index}`, {
                      scale: 1.15,
                      duration: 0.2,
                      background:
                        " linear-gradient(99.98deg,#001e86 4.09%,#5c0094 52.77%,#980092 104.46%)",
                      ease: "power1.inOut",
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(`#button-${index}`, {
                      scale: 1,
                      duration: 0.2,
                      background: "rgba(0, 0, 0, 0.3)",
                      ease: "power1.inOut",
                    });
                  }}
                  className={detailButtonsClass[0]}
                  key={index}
                >
                  <div className={detailButtonsClass[1]}>{names}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
