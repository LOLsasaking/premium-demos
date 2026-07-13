import { describe, expect, it } from 'vitest'
import * as THREE from 'three'
import { fitToFootprint, furnitureAssetPaths, loadFurnitureAsset } from './furnitureAssets'
import { BED_SIZES } from './modelKit'

describe('drop-in furniture asset convention', () => {
  it('matches every catalog bed size to its documented drop-in filename', () => {
    for (const size of BED_SIZES) {
      const slug = size.label.toLowerCase().replace(' bed', '')
      expect(furnitureAssetPaths('bed', size.width, size.depth)).toEqual([
        `models/furniture/bed-${slug}.glb`,
        'models/furniture/bed.glb',
      ])
    }
  })

  it('falls back to the generic bed file for an unrecognized footprint', () => {
    expect(furnitureAssetPaths('bed', 12, 12)).toEqual(
      expect.arrayContaining(['models/furniture/bed.glb']),
    )
  })

  it('uses one conventioned filename per non-bed kind', () => {
    expect(furnitureAssetPaths('sofa', 6.5, 3)).toEqual(['models/furniture/sofa.glb'])
    expect(furnitureAssetPaths('shower', 3, 3)).toEqual(['models/furniture/shower.glb'])
    expect(furnitureAssetPaths('garage-storage', 6, 1.5)).toEqual(['models/furniture/garage-storage.glb'])
  })

  it('resolves null (never rejects) when no drop-in file exists at the conventioned path', async () => {
    await expect(loadFurnitureAsset('sofa', 6.5, 3)).resolves.toBeNull()
  })

  it('normalizes an arbitrary GLB onto the footprint regardless of native scale or pivot', () => {
    const group = new THREE.Group()
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2))
    mesh.position.set(50, 17, -30) // arbitrary native pivot, far from origin
    group.add(mesh)

    fitToFootprint(group, 5, 4)

    const box = new THREE.Box3().setFromObject(group)
    const size = box.getSize(new THREE.Vector3())
    expect(size.x).toBeCloseTo(Math.min(5, 4), 5) // uniform scale keeps the box a cube
    const center = box.getCenter(new THREE.Vector3())
    expect(center.x).toBeCloseTo(0, 5)
    expect(center.z).toBeCloseTo(0, 5)
    expect(box.min.y).toBeCloseTo(0, 5) // rests on the floor
  })
})
