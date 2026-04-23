import type { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import type { Object3DNode, MaterialNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    // intentionally empty to allow the module augmentation below
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>
  }
}
