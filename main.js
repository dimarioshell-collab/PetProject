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

// Объект для отслеживания нажатых клавиш
const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

// Слушатели событий клавиатуры
window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      keys.forward = true;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.backward = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.left = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.right = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      keys.forward = false;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.backward = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.left = false;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.right = false;
      break;
  }
});

// Скорость движения
const speed = 3;

// Функция обновления позиции куба (вызывать в animate)
function updateMovement(delta = 0) {
  const moveVector = new THREE.Vector3(0, 0, 0);

  if (keys.forward) moveVector.z -= 1;
  if (keys.backward) moveVector.z += 1;
  if (keys.left) moveVector.x -= 1;
  if (keys.right) moveVector.x += 1;
  if (moveVector.length() > 0) {
    moveVector.normalize().multiplyScalar((speed * delta) / 100000);
    cube.position.add(moveVector);
    // Поворачиваем куб в направлении движения
    const angle = Math.atan2(moveVector.x, moveVector.z);
    cube.rotation.y = angle;
  }
}

const clock = new THREE.Timer();

// В цикле анимации
function animate(timestamp) {
  requestAnimationFrame(animate);

  updateMovement(timestamp);

  renderer.render(scene, camera);
}
animate();
