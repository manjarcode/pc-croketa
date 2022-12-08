import { RepeatWrapping, TextureLoader } from "three"
import {sandImg, ballImg } from "../assests/images.js"

const textureLoader = new TextureLoader()

function setupTexture(image, width, height) {
    const texture = textureLoader.load(image)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(width, height)
    return texture
}

export const sand = setupTexture(sandImg, 64, 64)
export const ball = setupTexture(ballImg, 512, 512)