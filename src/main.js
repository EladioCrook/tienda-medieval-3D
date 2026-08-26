import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector("#visor3d")});
renderer.setSize(window.innerWidth, window.innerHeight);
const orbitControls = new OrbitControls(camera, renderer.domElement);


// Geometría
/*<--Eliminar esta linea
const loader = new GLTFLoader();

loader.load('/src/assets/nombre-del-modelo-1.glb', (gltf) => {
  const modelo = gltf.scene;
  scene.add(modelo);
});

loader.load('/src/assets/nombre-del-modelo-2.glb', (gltf) => {
  const modelo = gltf.scene;
  scene.add(modelo);
});

loader.load('/src/assets/nombre-del-modelo-3.glb', (gltf) => {
  const modelo = gltf.scene;
  scene.add(modelo);
});
*/ //<--Eliminar esta linea

//Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


// Render
function render() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(render);
