import { RepeatWrapping, TextureLoader } from "three"
import {default as sandImage } from "../assests/images.js"

const textureLoader = new TextureLoader()
export const sand = textureLoader.load(sandImage)
sand.wrapS = RepeatWrapping
sand.wrapT = RepeatWrapping
sand.repeat.set(64, 64)
