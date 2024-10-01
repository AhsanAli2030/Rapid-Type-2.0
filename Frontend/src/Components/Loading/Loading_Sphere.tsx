import React, { useEffect } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "../../index.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useParams } from "react-router-dom"; // Import useParams
gsap.registerPlugin(useGSAP);
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthenticationActions } from "../../Store/Authentcation";
function Loading_Sphere() {
  const { newUserCreatedData } = useSelector((store) => store.Authentication);
  const { newUserActivatedData } = useSelector((store) => store.Authentication);
  const dispatch = useDispatch();
  const [verified, setVerified] = React.useState(false);
  const { uid, token } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (newUserCreatedData && newUserActivatedData) {
      navigate("/get-started");
    }
  }, [newUserCreatedData, newUserActivatedData]);
  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    // Geometry and material
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const colors: number[] = [];

    // Assign random colors to each vertex
    const vertexCount = geometry.attributes.position.count;
    for (let i = 0; i < vertexCount; i++) {
      colors.push(Math.random(), Math.random(), Math.random());
    }
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshStandardMaterial({ vertexColors: true });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Camera setup
    const size = { width: 800, height: 500 };
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 50);
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
    // const control = new OrbitControls(camera, target);
    // control.enableDamping = true;

    // Animation loop
    const tick = () => {
      //   control.update();
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.01;
      sphere.rotation.z += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    // Cleanup function
    return () => {
      //   control.dispose();
      renderer.dispose();

      scene.remove(sphere);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    if (uid && token) {
      VerifyUser();

      setVerified(true);
    }
  }, []);

  const VerifyUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token });

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/users/activation/`,
        body,
        config,
      );
      if (res.status === 204) {
        dispatch(
          AuthenticationActions.newUserCreatedRed({
            created: true,
            activated: true,
          }),
        );
      }

      // dispatch({
      //     type: ACTIVATION_SUCCESS,
      // });
    } catch (err) {
      //     dispatch({
      //         type: ACTIVATION_FAIL
      //     })
    }
  };

  useGSAP(() => {
    gsap.to(".dot-animation", {
      duration: 1,
      opacity: 1,
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex flex-col items-center justify-center -m-32 ml-8">
        <canvas id="loadingCanvas"></canvas>
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

export default Loading_Sphere;
