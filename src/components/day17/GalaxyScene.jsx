import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GalaxyScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030b18");
    scene.fog = new THREE.FogExp2("#030b18", 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    const galaxy = new THREE.Group();
    scene.add(galaxy);

    const particleCount = 18000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const blue = new THREE.Color("#398dff");
    const orange = new THREE.Color("#ff8a35");
    const white = new THREE.Color("#d8edff");

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 10;
      const arm = i % 5;
      const angle = arm * ((Math.PI * 2) / 5) + radius * 0.72;
      const spread = Math.pow(Math.random(), 1.7) * 1.5;

      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.65;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread;

      const colorMix = Math.random();
      const color = colorMix > 0.88 ? orange : colorMix > 0.55 ? white : blue;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = Math.random();
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    galaxyGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    const galaxyParticles = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxy.add(galaxyParticles);

    const starGeometry = new THREE.SphereGeometry(1.05, 48, 48);
    const starMaterial = new THREE.MeshBasicMaterial({ color: "#fff0d4" });
    const centralStar = new THREE.Mesh(starGeometry, starMaterial);
    galaxy.add(centralStar);

    const glowGeometry = new THREE.SphereGeometry(1.6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: "#ff9b45",
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const starGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    galaxy.add(starGlow);

    const light = new THREE.PointLight("#ff9c4a", 90, 30);
    light.position.set(0, 0, 0);
    scene.add(light);

    const ringGroup = new THREE.Group();
    galaxy.add(ringGroup);

    [3.1, 4.2, 5.5, 7.2].forEach((radius, index) => {
      const ringGeometry = new THREE.TorusGeometry(radius, 0.009, 8, 180);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? "#ff914d" : "#3f9cff",
        transparent: true,
        opacity: 0.48
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.15 + index * 0.12;
      ring.rotation.y = index * 0.3;
      ringGroup.add(ring);
    });

    const planetGeometry = new THREE.SphereGeometry(0.28, 32, 32);
    const planet = new THREE.Mesh(
      planetGeometry,
      new THREE.MeshStandardMaterial({
        color: "#ff813d",
        emissive: "#8c2f0b",
        emissiveIntensity: 1.5,
        roughness: 0.35
      })
    );
    planet.position.set(5.1, 0.25, 0);
    ringGroup.add(planet);

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(2200 * 3);

    for (let i = 0; i < 2200; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );

    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        color: "#b6d9ff",
        size: 0.075,
        transparent: true,
        opacity: 0.75
      })
    );
    scene.add(stars);

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    mount.addEventListener("pointermove", onMouseMove);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      galaxy.rotation.y = elapsed * 0.055;
      galaxyParticles.rotation.z = Math.sin(elapsed * 0.15) * 0.04;
      ringGroup.rotation.y = elapsed * 0.12;
      centralStar.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.035);
      starGlow.scale.setScalar(1 + Math.sin(elapsed * 1.3) * 0.09);
      stars.rotation.y = elapsed * 0.006;

      target.x += (mouse.x * 1.8 - target.x) * 0.025;
      target.y += (-mouse.y * 1.1 - target.y) * 0.025;

      camera.position.x = target.x;
      camera.position.y = 5 + target.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("resize", onResize);
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      starsGeometry.dispose();
      stars.material.dispose();
      ringGroup.children.forEach((child) => {
        child.geometry.dispose();
        child.material.dispose();
      });
      planet.geometry.dispose();
      planet.material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="galaxy-canvas" ref={mountRef} />;
}
