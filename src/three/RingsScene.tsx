import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export type Variante = "aneis" | "esferas";

type Props = {
  variante: Variante;
  ativo: boolean; // pausa o render quando fora da tela
  leve: boolean; // celular: sem transmission
  estatico: boolean; // prefers-reduced-motion
  seguirCursor: boolean;
};

const DOURADO = "#C4AC8F";
const VIDRO = "#9db3cf";

function Vidro({ leve }: { leve: boolean }) {
  if (leve) {
    return <meshPhysicalMaterial color={VIDRO} roughness={0.2} metalness={0.1} clearcoat={1} clearcoatRoughness={0.15} transparent opacity={0.72} />;
  }
  return (
    <MeshTransmissionMaterial
      color={VIDRO}
      samples={4}
      resolution={256}
      thickness={0.35}
      roughness={0.12}
      transmission={1}
      ior={1.35}
      chromaticAberration={0.02}
      anisotropicBlur={0.1}
      backside={false}
    />
  );
}

function Dourado() {
  return <meshStandardMaterial color={DOURADO} metalness={0.9} roughness={0.3} />;
}

/** "Conectar histórias": dois anéis entrelaçados. */
function Aneis({ leve }: { leve: boolean }) {
  return (
    <group rotation={[0.35, -0.5, 0.15]}>
      <mesh>
        <torusGeometry args={[1, 0.085, 32, 128]} />
        <Vidro leve={leve} />
      </mesh>
      <mesh position={[1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.085, 32, 128]} />
        <Dourado />
      </mesh>
    </group>
  );
}

function Esferas({ leve }: { leve: boolean }) {
  return (
    <group>
      <mesh position={[-0.35, 0.25, 0]}>
        <sphereGeometry args={[0.42, 48, 48]} />
        <Vidro leve={leve} />
      </mesh>
      <mesh position={[0.45, -0.35, 0.2]}>
        <sphereGeometry args={[0.2, 48, 48]} />
        <Dourado />
      </mesh>
    </group>
  );
}

function Movimento({ children, estatico, seguirCursor }: { children: React.ReactNode; estatico: boolean; seguirCursor: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || estatico) return;
    g.rotation.y += delta * 0.12; // rotação lenta
    if (seguirCursor) {
      // leve parallax com o cursor
      g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.25, 0.04);
      g.position.y = THREE.MathUtils.lerp(g.position.y, state.pointer.y * 0.2, 0.04);
    }
  });
  if (estatico) return <group ref={ref}>{children}</group>;
  return (
    <group ref={ref}>
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.6}>
        {children}
      </Float>
    </group>
  );
}

export default function RingsScene({ variante, ativo, leve, estatico, seguirCursor }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={ativo && !estatico ? "always" : "demand"}
      camera={{ position: [0, 0, 5.2], fov: 35 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      {/* Fundo igual ao da seção: o vidro refrata a cor certa em vez de preto */}
      <color attach="background" args={["#0E1D31"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      {/* Ambiente procedural e discreto (sem HDR externo) */}
      <Environment resolution={64}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[8, 2, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={1.4} position={[2, 1, 4]} scale={2} color="#e6ecf2" />
        <Lightformer intensity={0.8} position={[-4, 0, 2]} scale={[2, 6, 1]} color="#c9d6e6" />
        <Lightformer intensity={0.6} position={[4, -2, 2]} scale={[2, 4, 1]} color={DOURADO} />
      </Environment>
      <Movimento estatico={estatico} seguirCursor={seguirCursor}>
        {variante === "aneis" ? <Aneis leve={leve} /> : <Esferas leve={leve} />}
      </Movimento>
    </Canvas>
  );
}
