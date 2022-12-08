import { useEffect, useState } from "react";

const KEYBOARD_MAPPING = {
    'KeyW': 'forward',
    'KeyS': 'backward',
    'KeyA': 'left',
    'KeyD': 'right'
}

export default function useKeyboard() {
    const [actions, setActions ] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false
    })

    useEffect(() => {
        const handleKeydown = ({code}) => {
            const action = KEYBOARD_MAPPING[code]
            if (action) {
                setActions(value => ({...value, [action]: true}))
            }
        }

        const handleKeyup = ({code}) => {
            const action = KEYBOARD_MAPPING[code]

            if(action) {
                setActions(value => ({...value, [action]: false}))
            }
        }

        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('keyup', handleKeyup)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('keyup', handleKeyup)
        }
    })

    return actions
}