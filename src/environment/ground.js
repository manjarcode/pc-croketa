import { usePlane } from "@react-three/cannon"
import {sand} from "../textures/index" 

export function Ground() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0],
        position: [0, -1, 0]
    }))


    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[50,50]} />
            <meshStandardMaterial attach="material" map={sand}></meshStandardMaterial>
        </mesh>
    )
}