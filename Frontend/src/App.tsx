//import Navbar from "./components/navbar/Navbar";
import React, { useEffect, lazy, Suspense } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./Components/Navbar/Navbar.css";
gsap.registerPlugin(useGSAP);
import "./index.css";
import Navbar from "./Components/Navbar/Navbar";
const Testing = lazy(() => import("./Components/Testing/Testing"));
import Loading_Sphere from "./Components/Loading/Loading_Sphere";
const About = lazy(() => import("./Components/About/About"));

const animationText = "Faster Fingers! Faster Results!";
const animationArray = animationText.split("");
function App() {
  useEffect(() => {
    // Three.js code
    const scene = new THREE.Scene();

    const size = {
      width: window.innerWidth,
      height: 0.469 * window.innerHeight, // Corrected spelling
    };

    let mixer: THREE.AnimationMixer | undefined;
    let loadedModel: THREE.Group | undefined;
    let animationDuration = 0;

    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./3D_Models/draco/");
    gltfLoader.dracoLoader = dracoLoader;

    gltfLoader.load("./3D_Models/KeyboardFinal.glb", (gltf) => {
      loadedModel = gltf.scene;

      // Retrieve the stored scale factor or default to 1 if not found
      const storedScaleFactor = localStorage.getItem("modelScaleFactor");
      const scaleFactor = storedScaleFactor ? parseFloat(storedScaleFactor) : 1;

      // Apply the scale factor to the model
      gltf.scene.scale.set(
        0.8 * scaleFactor,
        0.8 * scaleFactor,
        0.8 * scaleFactor,
      );
      gltf.scene.rotation.x += 0.05;

      mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.timeScale = 1.5;

      gltf.animations.forEach((clip) => {
        const action = mixer!.clipAction(clip);
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;

        action.play();
        animationDuration = Math.max(
          animationDuration,
          clip.duration / mixer!.timeScale,
        ); // Get the max duration of all clips
      });

      scene.add(gltf.scene);

      const textTimeline = gsap.timeline();
      const gsapDuration = animationDuration / animationArray.length / 1.5;
      textTimeline
        .to(".checkFingers", {
          duration: gsapDuration, // Spread the GSAP animation over the 3D animation duration
          opacity: 1,
          y: 20,
          stagger: gsapDuration, // Adjust stagger based on the 3D model's duration
          ease: "power2.out",
        })
        .to(".shortHeading", {
          opacity: 1,
          duration: animationDuration / animationArray.length,
          ease: "power2.out",
          y: 20,
        });
    });

    const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
    camera.position.set(0, 9, 4);
    camera.lookAt(0, 0, 0);

    scene.add(camera);

    // Access the canvas element after it's in the DOM
    const target =
      document.querySelector<HTMLCanvasElement>("#canvasElement") || undefined;
    const renderer = new THREE.WebGLRenderer({
      canvas: target,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(size.width, size.height);
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    window.addEventListener("resize", () => {
      size.width = window.innerWidth;
      size.height = 0.469 * window.innerHeight;
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Adjust the scale of the 3D model based on the new window size
      if (loadedModel) {
        const scaleFactor = Math.min(size.width / 1200, size.height / 450); // Scale based on initial size
        loadedModel.scale.set(
          0.8 * scaleFactor,
          0.8 * scaleFactor,
          0.8 * scaleFactor,
        ); // Adjust scale
        localStorage.setItem("modelScaleFactor", JSON.stringify(scaleFactor));
      }
      renderer.render(scene, camera);
    });

    const tick = () => {
      const delta = 0.017 * 1.5;
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  useEffect(() => {
    gsap.to(".down-arrow", {
      y: 15, // Move down by 20px
      duration: 1, // Duration of the animation (1 second)
      ease: "power1.inOut", // Easing for a smooth motion
      yoyo: true, // Reverses the animation back to the original state
      repeat: -1, // Repeat indefinitely
      scale: 1.2,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="w-full h-full">
        <Navbar></Navbar>
        <div className="w-screen h-20 "></div>
        <div className=" w-screen h-auto flex flex-col gap-3">
          <div className="w-screen h-auto font-lexend text-[#C3C3C3] font-bold text-center">
            <div className="   mt-10 text-shadow-heading  text-2xl font-extrabold md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              {animationArray.map((characters, index) => {
                return (
                  <span
                    key={index}
                    className="checkFingers opacity-0 inline-block"
                    style={{ display: "inline-block" }}
                  >
                    {characters === " " ? "\u00A0" : characters}
                  </span>
                );
              })}
            </div>
            <div className="2xl:mt-8  text-shadow-heading shortHeading opacity-0 text-md md:text-xl lg:text-2xl xl:text-3xl xl:mt-6  mt-4">
              Enhance your typing speed and accuracy! Track your progress and
              beat your personal best!
            </div>
          </div>

          <div className=" w-screen flex items-center justify-center ">
            <canvas
              id="canvasElement"
              className=" -mt-24 md:-mt-12 lg:-mt-0"
            ></canvas>
          </div>
          <div className="w-screen flex flex-col  justify-center  items-center -mt-16 lg:-mt-4">
            <div className="w-80  flex flex-col lg:flex-row lg:w-screen  gap-8 justify-center items-center ">
              <div
                id="hover-animation"
                onMouseEnter={() => {
                  gsap.to("#hover-animation", {
                    scale: 1.15,
                    duration: 0.6,
                    background:
                      " linear-gradient(99.98deg,#001e86 4.09%,#5c0094 52.77%,#980092 104.46%)",
                    ease: "power1.inOut",
                  });
                }}
                onMouseLeave={() => {
                  gsap.to("#hover-animation", {
                    scale: 1,
                    duration: 0.6,
                    background: "rgba(0, 0, 0, 0.3)",
                    ease: "power1.inOut",
                  });
                }}
                className="2xl:w-44 2xl:h-16 2xl:text-xl flex gap-2 items-center justify-center rounded-3xl  cursor-pointer bg-blend-color-burn font-inter font-bold
              box-shadow buttons-background w-64 h-16 text-xl -mt-12 md:-mt-0 "
              >
                <span className="down-arrow ">👇🏻</span>
                <div className="text-white"> Try a Demo</div>
              </div>{" "}
              <div
                className="2xl:w-72 2xl:h-16 2xl:text-xl flex gap-2 items-center justify-center rounded-3xl  cursor-pointer bg-blend-color-burn font-inter font-bold
                box-shadow buttons-background w-64 h-16 text-xl"
              >
                <div>👥</div>
                <div className="text-white"> Total Members : 0</div>
              </div>{" "}
              <div
                id="hover-animation-subscribe"
                onMouseEnter={() => {
                  gsap.to("#hover-animation-subscribe", {
                    scale: 1.15,
                    duration: 0.6,
                    background:
                      " linear-gradient(99.98deg,#001e86 4.09%,#5c0094 52.77%,#980092 104.46%)",
                    ease: "power1.inOut",
                  });
                }}
                onMouseLeave={() => {
                  gsap.to("#hover-animation-subscribe", {
                    scale: 1,
                    duration: 0.6,
                    background: "rgba(0, 0, 0, 0.3)",
                    ease: "power1.inOut",
                  });
                }}
                className="2xl:w-44 2xl:h-16 2xl:text-xl flex gap-2 items-center justify-center rounded-3xl  cursor-pointer bg-blend-color-burn font-inter font-bold
                box-shadow buttons-background w-64 h-16 text-xl"
              >
                <span className="subscribe ">🔔</span>
                <div className="text-white"> Subscribe</div>
              </div>{" "}
            </div>
          </div>
        </div>

        <Suspense fallback={<Loading_Sphere />}>
          <Testing />
        </Suspense>

        <About />
      </div>
    </React.Fragment>
  );
}

export default App;
