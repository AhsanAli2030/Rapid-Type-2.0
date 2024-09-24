import React, { useEffect } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "../../index.css";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

function Loading_Keyboard() {
  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./3D_Models/draco/");
    gltfLoader.setDRACOLoader(dracoLoader);
    let mixer: THREE.AnimationMixer | undefined;

    gltfLoader.load("./3D_Models/keyboard_animations.glb", (gltf) => {
      gltf.scene.scale.set(4.5, 4.5, 4.5);
      // glrf.scene.rotation.set()
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        const action = mixer!.clipAction(clip);

        action.play();
      });
      scene.add(gltf.scene);
    });

    // Camera setup
    const size = { width: 800, height: 500 };
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000,
    );
    camera.position.set(0, 9, 4);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // Light setup
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Renderer setup
    const target =
      document.querySelector<HTMLCanvasElement>("#loadingCanvas") || undefined;
    const renderer = new THREE.WebGLRenderer({
      canvas: target,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(size.width, size.height);

    // // Orbit controls
    // const controls = new OrbitControls(camera, target);
    // controls.enableDamping = true;

    // Animation loop
    let animationFrameId: number;
    const tick = () => {
      //   controls.update();
      if (mixer) mixer.update(0.02);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      //   controls.dispose();
      renderer.dispose();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material.isMaterial) {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  useEffect(() => {
    gsap.to(".dot-animation", {
      duration: 1,
      opacity: 1,

      yoyo: true,
      repeat: -1,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex flex-col items-center justify-center -m-32 ml-8">
        <canvas id="loadingCanvas" width="800" height="500"></canvas>
        <div className="-m-24 font-lexend text-[#C3C3C3] font-bold text-center text-shadow-heading text-3xl flex gap-3">
          <span>Loading</span>
          <span className="dot-animation opacity-0 text-[80px] text-center -mt-5">
            .
          </span>
          <span className="dot-animation opacity-0 text-[80px] text-center -mt-5">
            .
          </span>
          <span className="dot-animation opacity-0 text-[80px] text-center -mt-5">
            .
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Loading_Keyboard;
