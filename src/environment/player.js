import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"

export default function Player() {
    const {camera} = useThree()

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 10, 0]
    }))

    const position = useRef([0, 0, 0])

    useEffect(() => {
        api.position.subscribe(p => {
            position.current = p
        })
    }, [api.position])

    const velocity = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe(v => {
            velocity.current = v
        })
    }, [api.velocity])

    useFrame(() => {
        // camera.position.copy(new Vector3(...position.current))
        camera.position.copy(new Vector3(0,10,0))
        const forward = new Vector3(0, 0, -1)

        forward.multiplyScalar(2).applyEuler(camera.rotation)

        api.velocity.set(...forward)
        
    })


    return(
        <mesh ref={ref}>
            <sphereBufferGeometry attach="geometry"></sphereBufferGeometry>
            <meshStandardMaterial attach="material" color="blue" ></meshStandardMaterial>
        </mesh>
    )
}