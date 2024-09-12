import React from "react";
import stopWatch from "../../assets/static_files/Stopwatch.svg";
import pencil from "../../assets/static_files/Pencil.svg";
import Gears from "../../assets/static_files/Gear.svg";
import bars from "../../assets/static_files/Bars.svg";
import laptopPhone from "../../assets/static_files/Laptop-Phone.png";
import upArrow from "../../assets/static_files/Up Arrow.svg";
import code from "../../assets/static_files/Code.svg";
import keyboardLogo from "../../assets/static_files/Keyboard-logo.svg";
import Discord from "../../assets/static_files/Discord.svg";
import Github from "../../assets/static_files/Github.svg";
import LinkedIn from "../../assets/static_files/LinkedIn.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
interface detailsSection {
  detail: string;
  icon: string;
}

interface PropsInterfaceAbout {
  textBoxes: { detail: string; icon: string };
}
const Information_Boxes: React.FC<PropsInterfaceAbout> = (props) => {
  return (
    <React.Fragment>
      <div className="w-80 h-64  rounded-[30%] flex flex-col items-center justify-center relative background-about-box">
        <div className="absolute  -top-10  w-24 h-24 rounded-full gradient-border flex items-center justify-center text-4xl">
          <img src={props.textBoxes.icon} alt="" />
        </div>{" "}
        <div className="font-inter text-3xl text-white text-center w-full">
          {props.textBoxes.detail}
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

const Footer = () => {
  return (
    <React.Fragment>
      <div className="w-screen h-40 flex footerBG">
        <div className="w-[70%] flex flex-col justify-around">
          <div className="m-4 w-72  flex gap-1  ">
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
          <div className="text-2xl font-inter ml-4 text-white">
            {" "}
            ©️ 2024 Muhammad Ahsan Ali - All Rights Reserved
          </div>
        </div>
        <div className="w-[30%]  flex flex-col gap-5 font-inter text-xl text-white font-bold text-center mt-3 items-center">
          <div>0309-5806478</div>
          <div>ahsan20ali30@gmail.com</div>
          <div className="flex items-center justify-around w-[50%]">
            <img
              id="discord"
              title="Discord"
              className="cursor-pointer"
              onMouseEnter={() => {
                gsap.to(`#discord`, {
                  scale: 1.15,
                  duration: 0.3,

                  ease: "power1.inOut",
                });
              }}
              onMouseLeave={() => {
                gsap.to(`#discord`, {
                  scale: 1,
                  duration: 0.3,

                  ease: "power1.inOut",
                });
              }}
              src={Discord}
              alt=""
            />
            <img
              id="linkedin"
              title="Linked-In"
              className="cursor-pointer"
              onMouseEnter={() => {
                gsap.to(`#linkedin`, {
                  scale: 1.15,
                  duration: 0.3,

                  ease: "power1.inOut",
                });
              }}
              onMouseLeave={() => {
                gsap.to(`#linkedin`, {
                  scale: 1,
                  duration: 0.3,

                  ease: "power1.inOut",
                });
              }}
              src={LinkedIn}
              alt=""
            />
            <img
              id="github"
              title="Github"
              className="cursor-pointer"
              onMouseEnter={() => {
                gsap.to(`#github`, {
                  scale: 1.15,
                  duration: 0.3,

                  ease: "power1.inOut",
                });
              }}
              onMouseLeave={() => {
                gsap.to(`#github`, {
                  scale: 1,
                  duration: 0.3,

                  ease: "power1.inOut",
                });
              }}
              src={Github}
              alt=""
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const About = () => {
  const [textBoxes, setTextBoxes] = React.useState<detailsSection[]>([
    { detail: "Real-Time Perfomance Tracking", icon: stopWatch },
    { detail: "Customizable Practice Modes", icon: pencil },
    { detail: "Customizable Text Options", icon: Gears },
    { detail: "Adaptive Difficulty ", icon: bars },
  ]);
  return (
    <React.Fragment>
      <div className="w-screen flex ">
        <div className="w-1/2 ml-16">
          <div className="font-lexend text-[#C3C3C3] font-bold text-center text-5xl text-shadow-heading">
            About Rapid Type
          </div>
          <div className="w-full mt-20 flex flex-col gap-20 ">
            <div className="flex gap-10 justify-center">
              <Information_Boxes textBoxes={textBoxes[0]} />
              <Information_Boxes textBoxes={textBoxes[1]} />
            </div>
            <div className="flex gap-10 justify-center">
              <Information_Boxes textBoxes={textBoxes[2]} />
              <Information_Boxes textBoxes={textBoxes[3]} />
            </div>
          </div>
        </div>
        <div className="w-1/2  flex items-center justify-center">
          <img className="w-[75%] " src={laptopPhone} alt="" />{" "}
        </div>
      </div>
      <div className="flex mt-8 w-full items-center justify-center">
        {" "}
        <span className="font-inter text-3xl text-white text-center  w-[80%] flex items-center justify-center gap-4">
          Explore the Source Code{" "}
          <span className="  w-16 h-16 rounded-lg  flex items-center justify-center ">
            <img src={code} alt="" />
          </span>
        </span>
        <div className="  w-20 h-20 rounded-full gradient-border flex items-center justify-center text-4xl mb-8">
          <img
            id="up-arrow"
            className="cursor-pointer"
            onMouseEnter={() => {
              gsap.to(`#up-arrow`, {
                scale: 1.15,
                duration: 0.3,

                ease: "power1.inOut",
              });
            }}
            onMouseLeave={() => {
              gsap.to(`#up-arrow`, {
                scale: 1,
                duration: 0.3,

                ease: "power1.inOut",
              });
            }}
            src={upArrow}
            alt=""
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
