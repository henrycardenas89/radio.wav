import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "../styles/tailwind.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function Visualizer(props) {
  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  // Objects = physical body
  const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

  // Materials = skin on the objects
  const material = new THREE.MeshBasicMaterial();
  material.color = new THREE.Color(0xff0000);

  // Mesh = adds the material you want on the object
  const sphere = new THREE.Meshb(geometry, material);
  //then, add it to the scene
  scene.add(sphere);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 0.1);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", () => {
    // Update sized
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Animate
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update Objects
    sphere.rotation.y = 0.5 * elapsedTime;

    // Update Orbital Controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frae
    window.requestAnimationFrame(tick);
  };

  tick();

  return <div></div>;
}

export default Visualizer;
