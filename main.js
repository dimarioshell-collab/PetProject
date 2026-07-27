import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera (75,
window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00
} );
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate( time ) {

    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;

    renderer.render(scene, camera);
}

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js

const controls = new OrbitControls( camera, renderer.domElement,
);
const loader = new GLTFLoader();

import initJolt from "jolt-physics";
import joltWasmUrl from "jolt-physics/jolt-physics.wasm.wasm?url";

const Jolt = await initJolt({
  locateFile: () => joltWasmUrl,
});

import * as THREE from 'three';
import {
	computeBoundsTree, disposeBoundsTree,
	computeBatchedBoundsTree, disposeBatchedBoundsTree, acceleratedRaycast,
} from 'three-mesh-bvh';

// Add the extension functions
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

THREE.BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
THREE.BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
THREE.BatchedMesh.prototype.raycast = acceleratedRaycast;

// Generate geometry and associated BVH
const geom = new THREE.TorusKnotGeometry( 10, 3, 400, 100 );
const mesh = new THREE.Mesh( geom, material );
geom.computeBoundsTree();

// Or generate BatchedMesh and associated BVHs
const batchedMesh = new THREE.BatchedMesh( ... );
const geomId = batchedMesh.addGeometry( geom );
const instId = batchedMesh.addGeometry( geom );

// Generate bounds tree for sub geometry
batchedMesh.computeBoundsTree( geomId );

import { PointsBVH } from 'three-mesh-bvh';

// For point clouds
THREE.Points.prototype.raycast = acceleratedRaycast;

const points = new THREE.Points( geometry, material );
geometry.computeBoundsTree( { type: PointsBVH } );

// Or create directly
geometry.boundsTree = new PointsBVH( geometry );

import * as THREE from 'three';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

let mesh, geometry;
const invMat = new THREE.Matrix4();

// instantiate the geometry

// ...

const bvh = new MeshBVH( geometry );
invMat.copy( mesh.matrixWorld ).invert();

// raycasting
// ensure the ray is in the local space of the geometry being cast against
raycaster.ray.applyMatrix4( invMat );
const hit = bvh.raycastFirst( raycaster.ray );

// results are returned in local spac, as well, so they must be transformed into
// world space if needed.
hit.point.applyMatrixWorld( mesh.matrixWorld );

// spherecasting
// ensure the sphere is in the local space of the geometry being cast against
sphere.applyMatrix4( invMat );
const intersects = bvh.intersectsSphere( sphere );

const geometry = new KnotGeometry( 1, 0.5, 40, 10 );
const bvh = new MeshBVH( geometry );
const serialized = MeshBVH.serialize( bvh );

// ...

const deserializedBVH = MeshBVH.deserialize( serialized, geometry );
geometry.boundsTree = deserializedBVH;

import { GenerateMeshBVHWorker } from 'three-mesh-bvh/worker';

// ...

const geometry = new KnotGeometry( 1, 0.5, 40, 10 );
const worker = new GenerateMeshBVHWorker();
worker.generate( geometry ).then( bvh => {

    geometry.boundsTree = bvh;

} );