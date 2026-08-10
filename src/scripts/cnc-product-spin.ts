import {
  ACESFilmicToneMapping,
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

type SpinController = {
  setDegrees: (degrees: number) => void;
  resize: () => void;
  dispose: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createMetalMaterial = (color: string, roughness = 0.38, metalness = 0.92) =>
  new MeshPhysicalMaterial({
    color: new Color(color),
    metalness,
    roughness,
    clearcoat: 0.35,
    clearcoatRoughness: 0.45,
    envMapIntensity: 1.1,
  });

const createCabinet = (frontTexture: CanvasTexture | null) => {
  const root = new Group();
  const width = 1.72;
  const height = 1.72;
  const depth = 0.22;

  const shellMat = createMetalMaterial('#1c1f1d', 0.42, 0.9);
  const darkMat = createMetalMaterial('#101312', 0.5, 0.86);
  const accentMat = createMetalMaterial('#2a2f2c', 0.36, 0.92);

  const body = new Mesh(new RoundedBoxGeometry(width, height, depth, 5, 0.045), shellMat);
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  const lip = new Mesh(
    new RoundedBoxGeometry(width * 0.96, height * 0.96, depth * 0.42, 4, 0.03),
    darkMat,
  );
  lip.position.z = depth * 0.22;
  root.add(lip);

  const frontPanel = new Mesh(
    new RoundedBoxGeometry(width * 0.9, height * 0.9, 0.018, 3, 0.018),
    frontTexture
      ? new MeshPhysicalMaterial({
          map: frontTexture,
          metalness: 0.15,
          roughness: 0.55,
          clearcoat: 0.2,
          clearcoatRoughness: 0.55,
        })
      : accentMat,
  );
  frontPanel.position.z = depth * 0.42;
  frontPanel.castShadow = true;
  root.add(frontPanel);

  const backPlate = new Mesh(
    new RoundedBoxGeometry(width * 0.92, height * 0.92, 0.03, 3, 0.02),
    darkMat,
  );
  backPlate.position.z = -depth * 0.42;
  root.add(backPlate);

  const pocketGeo = new BoxGeometry(0.14, 0.14, 0.04);
  const pocketMat = createMetalMaterial('#1a1f1c', 0.55, 0.8);
  for (let row = -2; row <= 2; row += 1) {
    for (let col = -2; col <= 2; col += 1) {
      if (row === 0 && col === 0) continue;
      const pocket = new Mesh(pocketGeo, pocketMat);
      pocket.position.set(col * 0.28, row * 0.28, -depth * 0.5);
      root.add(pocket);
    }
  }

  const rimGeo = new BoxGeometry(width * 0.08, height * 0.08, depth * 0.7);
  const corners: Array<[number, number]> = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  for (const [x, y] of corners) {
    const corner = new Mesh(rimGeo, accentMat);
    corner.position.set(x * width * 0.42, y * height * 0.42, 0);
    root.add(corner);
  }

  return root;
};

const prepareFrontTexture = async (imageUrl: string) => {
  const loader = new TextureLoader();
  const source = await loader.loadAsync(imageUrl);
  source.colorSpace = SRGBColorSpace;

  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return source;

  ctx.fillStyle = '#ecece4';
  ctx.fillRect(0, 0, size, size);

  const img = source.image as HTMLImageElement;
  const scale = Math.min(size / img.width, size / img.height) * 0.92;
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  ctx.drawImage(img, (size - drawW) / 2, (size - drawH) / 2, drawW, drawH);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  source.dispose();
  return texture;
};

export const createCncProductSpin = async (
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  imageUrl: string,
): Promise<SpinController | null> => {
  const width = () => Math.max(host.clientWidth, 1);
  const height = () => Math.max(host.clientHeight, 1);

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width(), height(), false);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, width() / height(), 0.1, 40);
  camera.position.set(0, 0.35, 4.2);
  camera.lookAt(0, 0, 0);

  scene.add(new AmbientLight(0xffffff, 0.55));
  const key = new DirectionalLight(0xffffff, 1.35);
  key.position.set(2.4, 3.2, 3.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const fill = new DirectionalLight(0xdde7ff, 0.55);
  fill.position.set(-2.8, 1.2, 1.6);
  scene.add(fill);

  const rim = new DirectionalLight(0xffffff, 0.45);
  rim.position.set(0.2, 1.4, -3.2);
  scene.add(rim);

  const ground = new Mesh(
    new PlaneGeometry(6, 6),
    new MeshStandardMaterial({ color: '#e8e7df', roughness: 1, metalness: 0 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.05;
  ground.receiveShadow = true;
  scene.add(ground);

  let frontTexture: CanvasTexture | null = null;
  try {
    frontTexture = (await prepareFrontTexture(imageUrl)) as CanvasTexture;
  } catch {
    frontTexture = null;
  }

  const cabinet = createCabinet(frontTexture);
  cabinet.position.y = -0.05;
  scene.add(cabinet);

  let currentDegrees = 0;
  let raf = 0;
  let disposed = false;

  const render = () => {
    raf = 0;
    if (disposed) return;
    cabinet.rotation.y = (currentDegrees * Math.PI) / 180;
    cabinet.rotation.x = -0.18;
    renderer.render(scene, camera);
  };

  const requestRender = () => {
    if (raf || disposed) return;
    raf = window.requestAnimationFrame(render);
  };

  const controller: SpinController = {
    setDegrees(degrees) {
      currentDegrees = degrees;
      requestRender();
    },
    resize() {
      const w = width();
      const h = height();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      requestRender();
    },
    dispose() {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      renderer.dispose();
      frontTexture?.dispose();
      scene.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
        else material?.dispose();
      });
    },
  };

  requestRender();
  return controller;
};

export const initCncProductSpinFromDom = async () => {
  const section = document.querySelector<HTMLElement>('[data-product-spin]');
  if (!section) return;

  const track = section.querySelector<HTMLElement>('.product-spin-track') ?? section;
  const host = section.querySelector<HTMLElement>('[data-spin-canvas-host]');
  const canvas = section.querySelector<HTMLCanvasElement>('[data-spin-canvas]');
  const fallback = section.querySelector<HTMLElement>('[data-spin-fallback]');
  const meter = section.querySelector<HTMLElement>('[data-spin-degrees]');
  const imageUrl = host?.dataset.spinImage;
  const desktopSpin = window.matchMedia('(min-width: 64rem)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!host || !canvas || !imageUrl) return;

  let controller: SpinController | null = null;
  let spinFrame = 0;
  let booting = false;

  const showFallback = (visible: boolean) => {
    if (fallback) fallback.hidden = !visible;
    canvas.hidden = visible;
    host.classList.toggle('is-3d-ready', !visible);
  };

  const updateSpin = () => {
    spinFrame = 0;
    if (!controller || !desktopSpin.matches || prefersReducedMotion.matches) {
      controller?.setDegrees(0);
      if (meter) meter.textContent = '0°';
      return;
    }

    const rect = track.getBoundingClientRect();
    const travel = Math.max(rect.height - window.innerHeight, 1);
    const progress = clamp(-rect.top / travel, 0, 1);
    const degrees = Math.round(progress * 360);
    controller.setDegrees(degrees);
    if (meter) meter.textContent = `${degrees}°`;
  };

  const requestSpin = () => {
    if (spinFrame) return;
    spinFrame = window.requestAnimationFrame(updateSpin);
  };

  const tearDown = () => {
    controller?.dispose();
    controller = null;
    showFallback(true);
  };

  const boot = async () => {
    if (booting || controller || !desktopSpin.matches || prefersReducedMotion.matches) {
      if (!desktopSpin.matches || prefersReducedMotion.matches) showFallback(true);
      return;
    }
    booting = true;
    try {
      controller = await createCncProductSpin(host, canvas, imageUrl);
      if (!controller) {
        showFallback(true);
        return;
      }
      showFallback(false);
      updateSpin();
    } catch {
      tearDown();
    } finally {
      booting = false;
    }
  };

  await boot();

  window.addEventListener('scroll', requestSpin, { passive: true });
  window.addEventListener('resize', () => {
    controller?.resize();
    requestSpin();
  });
  desktopSpin.addEventListener?.('change', () => {
    if (desktopSpin.matches && !prefersReducedMotion.matches) void boot();
    else tearDown();
    requestSpin();
  });
  prefersReducedMotion.addEventListener?.('change', () => {
    if (prefersReducedMotion.matches) tearDown();
    else void boot();
    requestSpin();
  });
};

void initCncProductSpinFromDom();
