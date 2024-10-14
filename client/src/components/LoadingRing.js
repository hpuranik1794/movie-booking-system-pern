import { ring } from "ldrs"

const LoadingRing = () => {
  ring.register();
  
  return (
    <l-ring
      size="40"
      stroke="5"
      bg-opacity="0"
      speed="2" 
      color="#ffc857" 
    ></l-ring>
  )
}

export default LoadingRing
