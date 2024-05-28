import * as THREE from 'three'

import { useEffect, useRef, useState } from "react"

function Pyramid() {
  const [isPerspectiveCamera, setIsPerspectiveCamera] = useState(true)

  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight

    const perspectiveCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)

    const orthographicCamera = new THREE.OrthographicCamera(- 2 * aspect, 2 * aspect,
      2, -2, 1, 1000);

    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)

    refContainer.current?.appendChild(renderer.domElement)

    const geometry = new THREE.ConeGeometry(1, 2, 4)
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const pyramid = new THREE.Mesh(geometry, material);

    const planeGeometry = new THREE.PlaneGeometry(4, 4);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x8d99a3,
      side: THREE.DoubleSide
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(- Math.PI / 2);
    plane.translateZ(-1)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 1, 0)

    scene.add(pyramid);
    scene.add(plane);
    scene.add(directionalLight)

    perspectiveCamera.position.z = 5;
    orthographicCamera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate);

      pyramid.rotation.y += 0.01;

      if (isPerspectiveCamera) {
        renderer.render(scene, perspectiveCamera)
      } else {
        renderer.render(scene, orthographicCamera);
      }
    }

    animate();

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight
      perspectiveCamera.aspect = aspect
      perspectiveCamera.updateProjectionMatrix()

      orthographicCamera.left = - 2 * aspect
      orthographicCamera.right = 2 * aspect
      orthographicCamera.top = 2
      orthographicCamera.bottom = -2
      orthographicCamera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      refContainer.current?.removeChild(renderer.domElement)
    }
  }, [isPerspectiveCamera]);

  return (
    <div>
      <button onClick={() => setIsPerspectiveCamera(prev => !prev)} style={{ margin: "10px auto", display: "block", }}>
        {isPerspectiveCamera ? "Cámara ortográfica (2D)" : "Cámara de perspectiva (3D)"}</button>
      <div ref={refContainer}></div>
    </div>
  );
}

export default Pyramid
