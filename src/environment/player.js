import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Euler, Vector3 } from "three"

function cameraPosition(camera, position, rotation) {
    const camPosition = new Vector3(0, 3, 8)

    const camRotation = new Euler(...rotation)
    camPosition.add(new Vector3(...position))

    camera.position.copy(camPosition)
    camera.rotation.copy(camRotation)
}

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

    const rotation = useRef([0,0,0])
    useEffect(() => {
        api.rotation.subscribe(r => {
            rotation.current = r
        })
    })

    useFrame(() => {
        cameraPosition(camera, position.current, rotation.current)

        if (position.current[1] === 0)
        {
            const forward = new Vector3(0, 0, -1)
            api.velocity.set(...forward)
        }
    })

    return(
        <mesh ref={ref}>
            <sphereBufferGeometry attach="geometry"></sphereBufferGeometry>
            <meshStandardMaterial attach="material" color="blue" ></meshStandardMaterial>
        </mesh>
    )
}