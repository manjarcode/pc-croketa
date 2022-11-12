import {Canvas} from "@react-three/fiber"
import {Sky} from "@react-three/drei"
import {Physics} from "@react-three/cannon";
import {Ground} from "./environment/ground";
import PointView from "./environment/pointView";
import Player from "./environment/player";


function App() {
  return (
    <Canvas>
      <Sky sunPosition={[0, 100, 0]}/>
      <PointView></PointView>
      <ambientLight intensity={1}></ambientLight>
      <Physics>
        <Player />
        <Ground />
      </Physics>
    </Canvas>
  );
}

export default App;
