import * as THREE from "three";

// Создаём геометрию плоскости
const geometry = new THREE.PlaneGeometry(50, 50); // ширина, высота

// Создаём материал
const material = new THREE.MeshStandardMaterial({
  color: 0x3a5f3a,
  side: THREE.DoubleSide,
});

// Создаём меш (объединяем геометрию и материал)
const plane = new THREE.Mesh(geometry, material);

// По умолчанию плоскость стоит вертикально, поворачиваем её горизонтально
plane.rotation.x = -Math.PI / 2;

// Добавляем на сцену
const scene = new THREE.Scene();
scene.add(plane);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5; // adjust based on your model's scale
camera.position.y = 2; // adjust based on your model's scale
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometrys = new THREE.BoxGeometry(1, 1, 1); // ширина, высота, глубина
const materials = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
const cube = new THREE.Mesh(geometrys, materials);
scene.add(cube);

renderer.render(scene, camera);
