import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector("#visor3d")});
renderer.setSize(window.innerWidth, window.innerHeight);

const cuboMesh = new THREE.BoxGeometry(1, 1, 1);
const materialCubo = new THREE.MeshBasicMaterial({ color: 0x8B4513});
const cuboPrueba = new THREE.Mesh(cuboMesh, materialCubo);
scene.add(cuboPrueba);

renderer.render(scene, camera);