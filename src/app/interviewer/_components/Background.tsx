import { useTexture } from "@react-three/drei";

const Background: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const [texture] = useTexture([imgUrl]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[10, 8]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Background;
