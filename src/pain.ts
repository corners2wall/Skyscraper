import * as CANNON from 'cannon-es'
import { Vec3 } from 'math/Vec3'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera: THREE.Camera;
let orbitControl: OrbitControls;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;
let plane: THREE.Mesh;

// cannon.js variables
let world: CANNON.World;
let cubeBody: CANNON.Body;
let ground: CANNON.Body

initThree()
initCannon()
animate()

function initThree() {
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100)
    camera.position.set(3, 6, 7)

    // Scene
    scene = new THREE.Scene()

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)


    // Box
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshToonMaterial({ color: 'red' })

    const ambientLight = new THREE.AmbientLight('white', 0.2);

    scene.add(ambientLight)

    const pointLight = new THREE.PointLight('white', 1);

    // const pointLightHelper = new THREE.PointLightHelper(pointLight);

    // scene.add(pointLightHelper);

    const directionalLight = new THREE.DirectionalLight('white', 1);

    directionalLight.position.set(3, 3, 3);

    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);

    scene.add(directionalLightHelper);

    scene.add(directionalLight)


    // scene.add()

    pointLight.position.set(1, 5, 3)

    scene.add(pointLight)

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshToonMaterial({ color: '#ffffff' })

    plane = new THREE.Mesh(groundGeometry, groundMaterial);

    plane.rotateX(3 * (Math.PI / 2))

    scene.add(plane);

    orbitControl = new OrbitControls(camera, canvas)
}

function initCannon() {
    world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -10, 0)
    })

    /**
     *  Generate box
     */
    const cubeShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    cubeBody = new CANNON.Body({
        mass: 10,
    })

    cubeBody.addShape(cubeShape)
    cubeBody.angularVelocity.set(0, 0, 0)
    cubeBody.angularDamping = 0.6
    cubeBody.position.set(0, 15, 0)

    /**
     * Generate ground
     */

    const groundShape = new CANNON.Plane();
    ground = new CANNON.Body({
        mass: 0
    })

    ground.addShape(groundShape);
    ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    world.addBody(ground)
    world.addBody(cubeBody)
}

function animate() {
    requestAnimationFrame(animate)

    // Step the physics world
    world.fixedStep()

    // Copy coordinates from cannon.js to three.js
    mesh.position.set(...vectorAdapter(cubeBody.position));
    mesh.quaternion.set(...quaternionAdapter(cubeBody.quaternion))

    // Render three.js
    renderer.render(scene, camera);

    orbitControl.update()
}

function vectorAdapter(vector: Vec3): [x: number, y: number, z: number] {
    return [vector.x, vector.y, vector.z];
}

function quaternionAdapter(quaternion: CANNON.Quaternion): [x: number, y: number, z: number, w: number] {
    return [quaternion.x, quaternion.y, quaternion.z, quaternion.w];
}