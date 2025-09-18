import * as THREE from 'three';

const brownMat = new THREE.MeshLambertMaterial({ color: 0x8d5524 });
const darkBrownMat = new THREE.MeshLambertMaterial({ color: 0x4a2d1e });

export const BEAR_X_LIMIT = 3.5;
const BEAR_MOVE_SPEED = 0.08;
const BEAR_WOBBLE_AMOUNT = 0.2;

function createVoxel(x, y, z, w, h, d, mat) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    return mesh;
}

export function createBear() {
    const group = new THREE.Group();
    group.add(createVoxel(0, 0, 0, 1.5, 1.5, 1, brownMat));
    group.add(createVoxel(0, 1.25, 0, 1, 1, 1, brownMat));
    group.add(createVoxel(-0.4, 1.9, 0, 0.3, 0.3, 0.3, darkBrownMat));
    group.add(createVoxel(0.4, 1.9, 0, 0.3, 0.3, 0.3, darkBrownMat));
    group.add(createVoxel(0, 1.1, 0.5, 0.5, 0.4, 0.3, darkBrownMat));
    group.add(createVoxel(-0.5, -1, 0, 0.5, 0.5, 0.5, brownMat));
    group.add(createVoxel(0.5, -1, 0, 0.5, 0.5, 0.5, brownMat));
    group.position.set(0, 4, 4);
    group.rotation.y = Math.PI;
    group.userData.targetX = 0;
    group.userData.wobbleTimer = 0;
    return group;
}

export function updateBear(bear, moveDirection) {
    if (moveDirection !== 0 && bear.userData.isMovingWithKeys) {
        bear.userData.targetX = THREE.MathUtils.clamp(bear.position.x + moveDirection, -BEAR_X_LIMIT, BEAR_X_LIMIT);
    }
    const oldX = bear.position.x;
    const distanceToTarget = bear.userData.targetX - bear.position.x;
    const moveThisFrame = Math.sign(distanceToTarget) * Math.min(Math.abs(distanceToTarget), BEAR_MOVE_SPEED);
    if (Math.abs(distanceToTarget) > 0.01) {
        bear.position.x += moveThisFrame;
    }

    const velocityX = bear.position.x - oldX;
    if (Math.abs(velocityX) > 0.001) {
        bear.userData.wobbleTimer += 0.2;
        bear.rotation.z = Math.sin(bear.userData.wobbleTimer) * BEAR_WOBBLE_AMOUNT;
    } else {
        bear.rotation.z = THREE.MathUtils.lerp(bear.rotation.z, 0, 0.1);
    }
}