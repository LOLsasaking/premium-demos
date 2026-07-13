import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { BED_SIZES, type ModelKind } from './modelKit'

/**
 * Drop-in furniture models. Place a GLB at the conventioned path below and
 * it is picked up automatically on the next load — no code change needed:
 *
 *   public/models/furniture/<kind>.glb        generic model for that kind
 *                                              (sofa, toilet, tub, shower,
 *                                              range, refrigerator, …)
 *   public/models/furniture/bed-<size>.glb    bed size variant — one of
 *                                              twin, full, queen, king,
 *                                              cal-king (matches the
 *                                              nearest catalog size)
 *
 * A missing file 404s once, is cached, and the procedural placeholder in
 * modelKit.ts stays visible — nothing else changes. Any GLB that does load
 * is re-scaled and re-centered onto the plan footprint by fitToFootprint()
 * regardless of its native units or pivot, so a dropped-in file "just
 * works" without per-asset tuning.
 */

const loader = new GLTFLoader()
const cache = new Map<string, Promise<THREE.Group | null>>()

function assetUrl(relPath: string) {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}${relPath}`
}

function deepClone(source: THREE.Group) {
  const clone = source.clone(true)
  clone.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    mesh.geometry = mesh.geometry.clone()
    if (Array.isArray(mesh.material)) mesh.material = mesh.material.map((mat) => mat.clone())
    else mesh.material = mesh.material.clone()
  })
  return clone
}

function tryLoad(relPath: string): Promise<THREE.Group | null> {
  let pending = cache.get(relPath)
  if (!pending) {
    pending = loader.loadAsync(assetUrl(relPath)).then((gltf) => gltf.scene).catch(() => null)
    cache.set(relPath, pending)
  }
  return pending
}

/** Nearest catalog bed size for a footprint, as a filename slug. */
function bedSizeSlug(width: number, depth: number): string {
  let best = BED_SIZES[0]
  let bestDist = Infinity
  for (const size of BED_SIZES) {
    const dist = Math.abs(size.width - width) + Math.abs(size.depth - depth)
    if (dist < bestDist) {
      bestDist = dist
      best = size
    }
  }
  return best.label.toLowerCase().replace(' bed', '').replace(/\s+/g, '-')
}

/** Candidate drop-in paths for a furniture kind, most-specific first. */
export function furnitureAssetPaths(kind: ModelKind, width: number, depth: number): string[] {
  if (kind === 'bed') return [`models/furniture/bed-${bedSizeSlug(width, depth)}.glb`, 'models/furniture/bed.glb']
  return [`models/furniture/${kind}.glb`]
}

/** Loads the dropped-in model for a furniture kind, if one exists. Never
 *  rejects — resolves null when no matching file is present. */
export async function loadFurnitureAsset(kind: ModelKind, width: number, depth: number): Promise<THREE.Group | null> {
  for (const path of furnitureAssetPaths(kind, width, depth)) {
    const scene = await tryLoad(path)
    if (scene) return deepClone(scene)
  }
  return null
}

/**
 * Normalizes a dropped-in GLB onto the plan footprint: uniform scale so it
 * fits the width × depth rectangle, centered, resting on the floor (y=0).
 * Works regardless of the source file's native scale or pivot point.
 */
export function fitToFootprint(object: THREE.Object3D, width: number, depth: number) {
  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const scale = Math.min(width / Math.max(size.x, 0.01), depth / Math.max(size.z, 0.01)) || 1
  object.scale.setScalar(scale)
  const scaledBox = new THREE.Box3().setFromObject(object)
  const center = scaledBox.getCenter(new THREE.Vector3())
  object.position.x -= center.x
  object.position.y -= scaledBox.min.y
  object.position.z -= center.z
}
