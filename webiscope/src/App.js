import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import './App.css';

//Components
import Header from "./components/header";

//Box

function Box(props)
{
  const mesh = useRef();
  //Setting up state for hover effect
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  //Rotating the object useFrame
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.07;
    //mesh.current.position.y = mesh.current.position.x +=0.001;
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[3,3,3]}/>
      <meshStandardMaterial color={hovered ? 'white' : 'blue'} />
    </mesh>
  )
}

function App() {
  return (
   <>
     <Header></Header>
     <Canvas style={{height: 600}} camera={{ position: [0, 20, 25], fov: 45 }}>
       <ambientLight intensity={0.1}/>
       <spotLight position={[10, 10, 10]} angle={0.90} penumbra={1} />
       <pointLight position={[-10, -10, -10]} />
       <Box position={[-1.2, 0, 0]} />
       <Box position={[6, 0, 0]} />
       <OrbitControls/>
     </Canvas>
   </>
  );
}

export default App;
