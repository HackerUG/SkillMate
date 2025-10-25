import { useRef, useEffect, useState } from "react";
import "./Graphvisualizer.css";

const GraphVisualizer = ({ nodes, edges, highlight, highlightEdges }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Update size dynamically on resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { clientWidth } = svgRef.current.parentElement;
        const newWidth = Math.min(clientWidth, 600);
        const newHeight = newWidth * 0.66; 
        setDimensions({ width: newWidth, height: newHeight });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = dimensions;
  const radius = 20;
  const centerX = width / 2;
  const centerY = height / 2;
  const angleStep = (2 * Math.PI) / nodes.length;

  // Dynamic circular positioning
  const positions = nodes.reduce((acc, node, idx) => {
    const angle = idx * angleStep - Math.PI / 2;
    acc[node.id] = {
      x: centerX + Math.cos(angle) * (width / 3),
      y: centerY + Math.sin(angle) * (height / 3),
    };
    return acc;
  }, {});

  // Color helpers
  const strokeColor = (edge) => {
    const found = highlightEdges.find(
      (e) =>
        (e.source === edge.source && e.target === edge.target) ||
        (e.source === edge.target && e.target === edge.source)
    );
    if (!found) return "#ccc";
    if (found.path) return "gold";
    if (found.relaxed) return "#4ade80";
    return "#60a5fa";
  };

  const nodeColor = (id) => (highlight.includes(id) ? "#22c55e" : "#3b82f6");

  return (
    <div className="graph-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "auto",
          background: "#1e293b",
          borderRadius: "10px",
        }}
      >
        {/* Edges */}
        {edges.map((edge, idx) => {
          const { x: x1, y: y1 } = positions[edge.source];
          const { x: x2, y: y2 } = positions[edge.target];
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const isPath = highlightEdges.find(
            (e) =>
              (e.source === edge.source && e.target === edge.target) ||
              (e.source === edge.target && e.target === edge.source)
          )?.path;

          return (
            <g key={idx}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="link"
                stroke={strokeColor(edge)}
                strokeWidth={isPath ? 4 : 2}
              />
              <text
                x={midX}
                y={midY - 5}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const { x, y } = positions[node.id];
          return (
            <g key={node.id} className="node">
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={nodeColor(node.id)}
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
