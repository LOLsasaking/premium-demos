import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export const TECHNICAL_ASSET_PATHS = {
  'bulb-a19': 'models/technical/bulb-a19.glb',
  'bulb-smart': 'models/technical/bulb-smart.glb',
  'outlet-duplex': 'models/technical/outlet-duplex.glb',
  'outlet-smart': 'models/technical/outlet-smart.glb',
  'plug-grounded': 'models/technical/plug-grounded.glb',
  'switch-rocker': 'models/technical/switch-rocker.glb',
  'switch-smart': 'models/technical/switch-smart.glb',
  'junction-box': 'models/technical/junction-box.glb',
  panel: 'models/technical/panel.glb',
  'pipe-straight': 'models/technical/pipe-straight.glb',
  'pipe-elbow': 'models/technical/pipe-elbow.glb',
  'pipe-tee': 'models/technical/pipe-tee.glb',
  'pipe-ptrap': 'models/technical/pipe-ptrap.glb',
  'valve-shutoff': 'models/technical/valve-shutoff.glb',
  'floor-drain': 'models/technical/floor-drain.glb',
  'light-recessed': 'models/technical/light-recessed.glb',
  'light-pendant': 'models/technical/light-pendant.glb',
} as const

export type TechnicalAssetId = keyof typeof TECHNICAL_ASSET_PATHS

export function technicalAssetForDevice(
  layer: 'power' | 'lighting',
  kind: string,
  smart: boolean,
): TechnicalAssetId {
  if (layer === 'power') {
    if (kind === 'dedicated') return 'plug-grounded'
    return smart ? 'outlet-smart' : 'outlet-duplex'
  }
  if (kind === 'can') return 'light-recessed'
  if (kind === 'pendant') return 'light-pendant'
  if (kind === 'switch') return smart ? 'switch-smart' : 'switch-rocker'
  return smart ? 'bulb-smart' : 'bulb-a19'
}

export function plumbingServiceSource(
  appliances: Array<{ label: string; x: number; y: number }>,
  width: number,
  height: number,
) {
  const heater = appliances.find((appliance) => appliance.label === 'WH')
  return heater ? { x: heater.x, y: heater.y } : { x: Math.min(1.5, width / 4), y: Math.max(1.5, height - 1.5) }
}

export function cutawayGeometry(width: number, height: number) {
  const sideReturn = width * 0.16
  return {
    floorDepth: height * 0.74,
    sideReturn,
    openingStart: sideReturn,
    openingEnd: width - sideReturn,
    serviceZ: height + 0.8,
  }
}

const loader = new GLTFLoader()
const cache = new Map<TechnicalAssetId, Promise<THREE.Group>>()

function assetUrl(id: TechnicalAssetId) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}${TECHNICAL_ASSET_PATHS[id]}`
}

function deepClone(source: THREE.Group) {
  const clone = source.clone(true)
  clone.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    mesh.geometry = mesh.geometry.clone()
    if (Array.isArray(mesh.material)) mesh.material = mesh.material.map((m) => m.clone())
    else mesh.material = mesh.material.clone()
    mesh.castShadow = true
    mesh.receiveShadow = true
  })
  return clone
}

/** Loads once, then returns an independently disposable clone per scene. */
export async function loadTechnicalAsset(id: TechnicalAssetId): Promise<THREE.Group> {
  let pending = cache.get(id)
  if (!pending) {
    pending = loader.loadAsync(assetUrl(id)).then((gltf) => gltf.scene)
    cache.set(id, pending)
  }
  return deepClone(await pending)
}

export function preloadTechnicalAssets(ids: TechnicalAssetId[]) {
  return Promise.allSettled(ids.map((id) => loadTechnicalAsset(id)))
}
