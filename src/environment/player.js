import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Euler, Vector3 } from "three"
import { ball } from "../textures/index.js"
import useKeyboard from "./useKeyboard.js"

const PLAYER_SPEED = 5

function setCameraRotation(camera) {
    const camRotation = new Euler([0, Math.PI /2, 0])
    camera.position.copy(camRotation)
}

function cameraPosition(camera, position, rotation) {
    const camPosition = new Vector3(0, 3, 8)
    camPosition.add(new Vector3(...position))
    camera.position.copy(camPosition)
}


export default function Player() {
    const {camera} = useThree()
    const {forward, backward, left, right} = useKeyboard()

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 0, 0]
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

    setCameraRotation(camera, rotation.current)

    useFrame(() => {
        cameraPosition(camera, position.current, rotation.current)

        const direction = new Vector3()
        const frontVector = new Vector3(0, 0, 
          (backward ? 1: 0) - (forward ? 1 :0)
        )

        const lateralVector = new Vector3(
          (left ? 1 : 0) - (right ? 1 : 0),
          0, 0
        )

        direction
          .subVectors(frontVector, lateralVector)
          .normalize()
          .multiplyScalar(PLAYER_SPEED)
          .applyEuler(camera.rotation)

        api.velocity.set(...direction)
        
    })

    return(
        <mesh ref={ref}>
            <sphereBufferGeometry attach="geometry"></sphereBufferGeometry>
            <meshStandardMaterial attach="material" map={ball}></meshStandardMaterial>
        </mesh>
    )
}