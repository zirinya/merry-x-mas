import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
//Light
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 3)
pointLight.position.set(0, 1.2, 0)
scene.add(pointLight)

const hemisphereLight = new THREE.HemisphereLight(0x000000, 0x000000, 0.5)
scene.add(hemisphereLight)

const directionalLight = new THREE.DirectionalLight(0x000000, 0.4)
scene.add(directionalLight)

const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 3, 0)
// Blury shadow
spotLight.shadow.focus = 3;
scene.add(spotLight)

const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0
scene.add(ambientLight)


const material = new THREE.MeshStandardMaterial();
const cmtmaterial = new THREE.MeshStandardMaterial({color: 0x525252});

// Floor reflection
material.roughness = 0.4

const plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), material)
const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, 0.5), cmtmaterial)
const cone = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.8, 8, 1, false, 0, Math.PI * 2), cmtmaterial)
const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.8, 7, 1, false, 0, Math.PI * 2), cmtmaterial)
const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.6, 7, 1, false, 0, Math.PI * 2), cmtmaterial)
const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.3, 7, 1, false, 0, Math.PI * 2), cmtmaterial)

cylinder.position.set(0, -0.39, 0)
cone.position.set(0, 0.1, 0)
cone1.position.set(0, 0.5, 0)
cone2.position.set(0, 0.8, 0)
cone3.position.set(0, 1, 0)

scene.add(cylinder, cone, cone1, cone2, cone3);

plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(plane)

// Shadow
cone.castShadow = true;
plane.receiveShadow = true;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 256;
spotLight.shadow.mapSize.height = 256;
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 100;
spotLight.shadow.camera.fov = 30

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height

    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 3)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false;
controls.minPolarAngle = 1.5;
controls.maxPolarAngle = 0;

const renderer = new THREE.WebGLRenderer({canvas: canvas})
// Shadow Map
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Size OF scene
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () => { 
    controls.update()
    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
} // ////
tick()
