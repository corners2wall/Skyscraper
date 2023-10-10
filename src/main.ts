import { AmbientLight, AxesHelper, BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;

const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight);

camera.position.set(1, 2, 5)

const geometry = new BoxGeometry(3, 1, 3);

const material = new MeshPhongMaterial({ color: 0xfb8e00 });

const mesh = new Mesh(geometry, material);

const directionalLight = new DirectionalLight('white', 0.6);

directionalLight.position.set(5, 6, 3)

const ambientLight = new AmbientLight(0x404040, 0.7)

const axesHelper = new AxesHelper(5);

scene.add(mesh, ambientLight, directionalLight, axesHelper);

const renderer = new WebGLRenderer({ canvas });

camera.position.set(3.5, 4, 6);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);

}

animate();

window.addEventListener('click', () => {
    console.log('click');
})
