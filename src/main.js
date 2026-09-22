import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8d8d8d);
const visor3d = document.querySelector("#visor3d");
const camera = new THREE.PerspectiveCamera(75, visor3d.clientWidth / visor3d.clientHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y= 3;
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector("#visor3d")});
const orbitControls = new OrbitControls(camera, renderer.domElement);


// Geometría
const loader = new GLTFLoader();

let modeloActual = null

function cargarTaza(numero) {
  loader.load(`/src/assets/taza${numero}.glb`, (gltf) => {
    if (modeloActual !== null) {
      scene.remove(modeloActual)
    }
    const modelo = gltf.scene;
    scene.add(modelo);
    modeloActual = modelo
    modelo.scale.set(20, 20, 20)
  });
}

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
function ajustarTamano() {
  camera.aspect = visor3d.clientWidth / visor3d.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(visor3d.clientWidth, visor3d.clientHeight);  
}

renderer.setAnimationLoop(render);


// Datos
const datosTazas = {
  1: { nombre: "Taza de Almagre", descripcion: "Taza de tamaño pequeño muy elegante, decorada con un pigmento rojizo obtenido a partir del óxido de hierro.", precio: "2 Monedas de Oro" },
  2: { nombre: "Taza de Oropimente", descripcion: "Taza de tamaño medio muy elegante, decorada con un mineral amarillo intenso usado como pigmento.", precio: "3 Monedas de Oro" },
  3: { nombre: "Taza de Añil", descripcion: "Taza de tamaño grande muy elegante, decorada con un tinte azul obtenido a partir de la planta Añil.", precio: "4 Monedas de Oro" }
}

const nombre = document.querySelector("#nombre-producto");
const descripcion = document.querySelector("#texto-producto");
const precio = document.querySelector("#precio-producto");


// Numeración de la galería
const tarjetas = document.querySelectorAll(".tarjeta-producto")

const presentacion = document.querySelector("#presentacion");
const galeria = document.querySelector("#galeria");
const vistaProducto = document.querySelector("#vista-producto");

tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    const numero = tarjeta.dataset.taza;

    cargarTaza(numero);

    presentacion.style.display = "none"
    galeria.style.display = "none"
    visor3d.style.display = "block"
    vistaProducto.style.display = "flex"

    ajustarTamano()

    nombre.textContent = datosTazas[numero].nombre
    descripcion.textContent = datosTazas[numero].descripcion
    precio.textContent = datosTazas[numero].precio
  })
});