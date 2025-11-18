const SvgComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={260} height={90}>
    <path fill="#00A0D4" d="M27 27h16v36H27z" />
    <path stroke="#111B41" strokeWidth={4} d="M20 20h30M20 70h30" />
    <text
      x={80}
      y={48}
      fill="#111B41"
      fontFamily="Poppins, sans-serif"
      fontSize={40}
      fontWeight={600}
    >
      {"\r\n    STS\r\n  "}
    </text>
    <text
      x={80}
      y={84}
      fill="#00A0D4"
      fontFamily="Poppins, sans-serif"
      fontSize={28}
      fontWeight={500}
    >
      {"\r\n    TEXTILE\r\n  "}
    </text>
  </svg>
)
export default SvgComponent
