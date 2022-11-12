import {Canvas} from "@react-three/fiber"
import {Sky} from "@react-three/drei"
import {Physics} from "@react-three/cannon";
import {Ground} from "./environment/ground";
import Player from "./environment/player";


function App() {
  return (
    <Canvas>
      <Sky sunPosition={[0, 100, 0]}/>
      <ambientLight intensity={1}></ambientLight>
      <Physics>
        <Player />
        <Ground />
      </Physics>
    </Canvas>
  );
}

export default App;
