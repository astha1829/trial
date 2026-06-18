"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Users, UserPlus, FileText, Megaphone, Send, RefreshCw, Sliders, Activity } from "lucide-react";

interface EcosystemFlowProps {
  onActionClick?: (actionName: string) => void;
}

interface PhysicsNode {
  id: string;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glowColor: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Edge {
  source: string;
  target: string;
  color: string;
  sourceColor: string;
  targetColor: string;
  label: string;
}

interface Particle {
  id: string;
  edgeIndex: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export function CrmFlowVisualization({ onActionClick }: EcosystemFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Dragging & Click detection refs
  const draggedNodeId = useRef<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const pointerStartPos = useRef({ x: 0, y: 0 });

  // 5 Quick Action Nodes floating in the force-directed mesh
  const nodesRef = useRef<PhysicsNode[]>([
    { id: "create_contact", label: "Create Contact", badge: "⌘ + N", icon: Users, color: "#3b82f6", glowColor: "rgba(59, 130, 246, 0.4)", x: 200, y: 140, vx: 0, vy: 0 },
    { id: "create_group", label: "Create Group", badge: "⌘ + G", icon: UserPlus, color: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", x: 200, y: 340, vx: 0, vy: 0 },
    { id: "sync_templates", label: "Sync Templates", badge: "⌘ + S", icon: FileText, color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", x: 400, y: 240, vx: 0, vy: 0 },
    { id: "create_campaign", label: "Create Campaign", badge: "⌘ + C", icon: Megaphone, color: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.4)", x: 600, y: 140, vx: 0, vy: 0 },
    { id: "send_message", label: "Send Message", badge: "⌘ + M", icon: Send, color: "#ef4444", glowColor: "rgba(239, 68, 68, 0.4)", x: 600, y: 340, vx: 0, vy: 0 }
  ]);

  // Render positions updated at 60fps
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    create_contact: { x: 200, y: 140 },
    create_group: { x: 200, y: 340 },
    sync_templates: { x: 400, y: 240 },
    create_campaign: { x: 600, y: 140 },
    send_message: { x: 600, y: 340 }
  });

  // Track parent container measurements
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setDimensions({
          width: Math.max(rect.width, 600),
          height: Math.max(rect.height, 480)
        });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });
    observer.observe(containerRef.current);

    window.addEventListener("resize", updateDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Set initial position layout once container size is first measured
  const layoutInitialized = useRef(false);
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && !layoutInitialized.current) {
      layoutInitialized.current = true;
      const nodes = nodesRef.current;
      
      nodes[0].x = dimensions.width * 0.2;
      nodes[0].y = dimensions.height * 0.3;
      
      nodes[1].x = dimensions.width * 0.2;
      nodes[1].y = dimensions.height * 0.7;
      
      nodes[2].x = dimensions.width * 0.5;
      nodes[2].y = dimensions.height * 0.5;
      
      nodes[3].x = dimensions.width * 0.8;
      nodes[3].y = dimensions.height * 0.3;
      
      nodes[4].x = dimensions.width * 0.8;
      nodes[4].y = dimensions.height * 0.7;
      
      setPositions({
        create_contact: { x: nodes[0].x, y: nodes[0].y },
        create_group: { x: nodes[1].x, y: nodes[1].y },
        sync_templates: { x: nodes[2].x, y: nodes[2].y },
        create_campaign: { x: nodes[3].x, y: nodes[3].y },
        send_message: { x: nodes[4].x, y: nodes[4].y }
      });
    }
  }, [dimensions]);

  // Interconnected network edges connecting the actions
  const edges = useMemo<Edge[]>(() => [
    { source: "create_contact", target: "create_group", color: "#3b82f6", sourceColor: "#3b82f6", targetColor: "#10b981", label: "Member Add" },
    { source: "create_group", target: "create_campaign", color: "#10b981", sourceColor: "#10b981", targetColor: "#f59e0b", label: "Targeting" },
    { source: "sync_templates", target: "create_campaign", color: "#a855f7", sourceColor: "#a855f7", targetColor: "#f59e0b", label: "Format Link" },
    { source: "create_campaign", target: "send_message", color: "#f59e0b", sourceColor: "#f59e0b", targetColor: "#ef4444", label: "Execution" },
    { source: "create_contact", target: "sync_templates", color: "#3b82f6", sourceColor: "#3b82f6", targetColor: "#a855f7", label: "Asset Flow" }
  ], []);

  // Flowing particle state
  const [particles, setParticles] = useState<Particle[]>(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 5; i++) {
      initialParticles.push({
        id: `p-${i}-1`,
        edgeIndex: i,
        progress: 0,
        speed: 0.005 + Math.random() * 0.003,
        color: "#ffffff",
        size: 3
      });
      initialParticles.push({
        id: `p-${i}-2`,
        edgeIndex: i,
        progress: 0.5,
        speed: 0.005 + Math.random() * 0.003,
        color: "#ffffff",
        size: 3
      });
    }
    return initialParticles;
  });

  // Force-directed physics loop
  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      const nodes = nodesRef.current;
      const numNodes = nodes.length;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      if (physicsEnabled) {
        // 1. Repulsion
        for (let i = 0; i < numNodes; i++) {
          for (let j = i + 1; j < numNodes; j++) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];

            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            if (dist < 280) {
              const force = 34000 / (dist * dist);
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;

              if (draggedNodeId.current !== nodeA.id) {
                nodeA.vx -= fx;
                nodeA.vy -= fy;
              }
              if (draggedNodeId.current !== nodeB.id) {
                nodeB.vx += fx;
                nodeB.vy += fy;
              }
            }
          }
        }

        // 2. Springs
        edges.forEach(edge => {
          const nodeA = nodes.find(n => n.id === edge.source);
          const nodeB = nodes.find(n => n.id === edge.target);
          if (!nodeA || !nodeB) return;

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const restLength = 180;
          const kSpring = 0.035;
          const force = kSpring * (dist - restLength);

          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (draggedNodeId.current !== nodeA.id) {
            nodeA.vx += fx;
            nodeA.vy += fy;
          }
          if (draggedNodeId.current !== nodeB.id) {
            nodeB.vx -= fx;
            nodeB.vy -= fy;
          }
        });

        // 3. Gravity & Drift
        nodes.forEach(node => {
          if (draggedNodeId.current === node.id) return;

          const dx = centerX - node.x;
          const dy = centerY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const gravityStrength = 0.015;
          node.vx += (dx / dist) * dist * gravityStrength;
          node.vy += (dy / dist) * dist * gravityStrength;

          node.vx += (Math.random() - 0.5) * 0.12;
          node.vy += (Math.random() - 0.5) * 0.12;
        });
      }

      // 5. Integrate positions
      const padding = 70;
      const damping = 0.85;

      nodes.forEach(node => {
        if (draggedNodeId.current === node.id) {
          node.vx = 0;
          node.vy = 0;
          return;
        }

        if (physicsEnabled) {
          node.x += node.vx;
          node.y += node.vy;

          node.vx *= damping;
          node.vy *= damping;
        }

        if (node.x < padding) {
          node.x = padding;
          node.vx = -node.vx * 0.5;
        } else if (node.x > dimensions.width - padding) {
          node.x = dimensions.width - padding;
          node.vx = -node.vx * 0.5;
        }

        if (node.y < padding) {
          node.y = padding;
          node.vy = -node.vy * 0.5;
        } else if (node.y > dimensions.height - padding) {
          node.y = dimensions.height - padding;
          node.vy = -node.vy * 0.5;
        }
      });

      // Particles
      setParticles(prev =>
        prev.map(p => {
          const edge = edges[p.edgeIndex];
          const isConnectedToHovered = hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);
          const currentSpeed = isConnectedToHovered ? p.speed * 2.0 : p.speed;
          
          let nextProgress = p.progress + currentSpeed;
          if (nextProgress >= 1) nextProgress = 0;
          return { ...p, progress: nextProgress };
        })
      );

      setPositions({
        create_contact: { x: nodes[0].x, y: nodes[0].y },
        create_group: { x: nodes[1].x, y: nodes[1].y },
        sync_templates: { x: nodes[2].x, y: nodes[2].y },
        create_campaign: { x: nodes[3].x, y: nodes[3].y },
        send_message: { x: nodes[4].x, y: nodes[4].y }
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions, physicsEnabled, edges, hoveredNodeId]);

  // Pointer dragging event callbacks
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    draggedNodeId.current = id;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const node = nodesRef.current.find(n => n.id === id);
      if (node) {
        dragOffset.current = {
          x: mouseX - node.x,
          y: mouseY - node.y
        };
      }
    }
  };

  const handlePointerMove = (id: string, e: React.PointerEvent) => {
    if (draggedNodeId.current !== id) return;
    e.preventDefault();

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const node = nodesRef.current.find(n => n.id === id);
      if (node) {
        node.x = mouseX - dragOffset.current.x;
        node.y = mouseY - dragOffset.current.y;

        const padding = 50;
        node.x = Math.max(padding, Math.min(dimensions.width - padding, node.x));
        node.y = Math.max(padding, Math.min(dimensions.height - padding, node.y));

        node.vx = 0;
        node.vy = 0;
      }
    }
  };

  const handlePointerUp = (id: string, e: React.PointerEvent) => {
    if (draggedNodeId.current === id) {
      const target = e.currentTarget as HTMLElement;
      target.releasePointerCapture(e.pointerId);
      draggedNodeId.current = null;

      // Click detection: if mouse barely moved, trigger the callback
      const dist = Math.hypot(e.clientX - pointerStartPos.current.x, e.clientY - pointerStartPos.current.y);
      if (dist < 5 && onActionClick) {
        const node = nodesRef.current.find(n => n.id === id);
        if (node) {
          onActionClick(node.label);
        }
      }
    }
  };

  const triggerImpulse = () => {
    nodesRef.current.forEach(node => {
      node.vx = (Math.random() - 0.5) * 25;
      node.vy = (Math.random() - 0.5) * 25;
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col justify-between min-h-[480px] rounded-[24px] border border-border bg-card dark:bg-card dark:bg-card/60 dark:backdrop-blur-xl shadow-sm dark:shadow-2xl transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Control Header overlay */}
      <div className="absolute top-0 left-0 w-full z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 gap-4 pointer-events-none">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 className="text-base font-bold text-foreground tracking-wide">Quick Actions Workflow</h2>
          </div>
          <p className="text-[11px] text-muted-foreground">Click a node to execute operational CRM action. Drag nodes to restructure paths.</p>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto shrink-0 bg-secondary/60 backdrop-blur border border-border rounded-2xl p-1.5 shadow-sm dark:shadow-lg">
          <button
            onClick={() => setPhysicsEnabled(!physicsEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
              physicsEnabled 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>{physicsEnabled ? "Active" : "Static"}</span>
          </button>
          
          <button
            onClick={triggerImpulse}
            className="flex items-center justify-center p-1.5 rounded-xl border border-border hover:border-border hover:bg-secondary transition-all text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 w-full h-full">
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <defs>
            <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {edges.map((edge) => {
              const srcPos = positions[edge.source];
              const tgtPos = positions[edge.target];
              if (!srcPos || !tgtPos) return null;
              
              return (
                <linearGradient
                  key={`gradient-${edge.source}-${edge.target}`}
                  id={`gradient-${edge.source}-${edge.target}`}
                  x1={`${srcPos.x}`}
                  y1={`${srcPos.y}`}
                  x2={`${tgtPos.x}`}
                  y2={`${tgtPos.y}`}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={edge.sourceColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={edge.targetColor} stopOpacity="0.8" />
                </linearGradient>
              );
            })}
          </defs>

          {/* Connection Lines */}
          {edges.map((edge) => {
            const srcPos = positions[edge.source];
            const tgtPos = positions[edge.target];
            if (!srcPos || !tgtPos) return null;

            const isRelatedHover = hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);
            const isAnyHover = hoveredNodeId !== null;

            return (
              <g key={`edge-${edge.source}-${edge.target}`}>
                {isRelatedHover && (
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={`url(#gradient-${edge.source}-${edge.target})`}
                    strokeWidth="6"
                    strokeOpacity="0.3"
                    style={{ filter: "blur(4px)" }}
                  />
                )}
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={`url(#gradient-${edge.source}-${edge.target})`}
                  strokeWidth={isRelatedHover ? "2.5" : "1.5"}
                  strokeDasharray="5 5"
                  strokeOpacity={isRelatedHover ? 0.9 : isAnyHover ? 0.15 : 0.4}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Flowing Particles */}
          {particles.map((p) => {
            const edge = edges[p.edgeIndex];
            const srcPos = positions[edge.source];
            const tgtPos = positions[edge.target];
            if (!srcPos || !tgtPos) return null;

            const isRelatedHover = hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);
            const isAnyHover = hoveredNodeId !== null;
            
            const px = srcPos.x + p.progress * (tgtPos.x - srcPos.x);
            const py = srcPos.y + p.progress * (tgtPos.y - srcPos.y);

            return (
              <circle
                key={p.id}
                cx={px}
                cy={py}
                r={isRelatedHover ? p.size + 1.2 : p.size}
                fill={isRelatedHover ? "#ffffff" : edge.targetColor}
                opacity={isRelatedHover ? 1.0 : isAnyHover ? 0.15 : 0.8}
                filter="url(#particle-glow)"
              />
            );
          })}
        </svg>

        {/* Nodes layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {nodesRef.current.map((node) => {
            const Icon = node.icon;
            const pos = positions[node.id] || { x: 200, y: 150 };
            const isHovered = hoveredNodeId === node.id;
            const isAnyHover = hoveredNodeId !== null;
            const isConnectedToHover = 
              hoveredNodeId && 
              edges.some(e => 
                (e.source === node.id && e.target === hoveredNodeId) ||
                (e.target === node.id && e.source === hoveredNodeId)
              );

            const nodeScale = isHovered ? 1.12 : isConnectedToHover ? 1.04 : 1.0;
            const opacityClass = (isHovered || isConnectedToHover || !isAnyHover) ? "opacity-100" : "opacity-40";

            return (
              <div
                key={node.id}
                className={`absolute flex flex-col items-center justify-center pointer-events-auto select-none transition-opacity duration-300 cursor-pointer ${opacityClass}`}
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                  width: "120px",
                  height: "120px"
                }}
              >
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-full blur-2xl transition-all duration-300 pointer-events-none"
                    style={{
                      backgroundColor: node.color,
                      opacity: 0.15,
                      transform: "scale(1.2)"
                    }}
                  />
                )}

                <div
                  onPointerDown={(e) => handlePointerDown(node.id, e)}
                  onPointerMove={(e) => handlePointerMove(node.id, e)}
                  onPointerUp={(e) => handlePointerUp(node.id, e)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className="relative flex items-center justify-center w-16 h-16 rounded-full bg-background/80 backdrop-blur-xl border transition-all duration-300 shadow-sm dark:shadow-xl"
                  style={{
                    borderColor: isHovered || isConnectedToHover ? node.color : "var(--border)",
                    boxShadow: isHovered 
                      ? `0 0 25px ${node.glowColor}, inset 0 0 12px ${node.glowColor}`
                      : isConnectedToHover
                        ? `0 0 15px ${node.glowColor}`
                        : "none",
                    transform: `scale(${nodeScale})`
                  }}
                >
                  <Icon 
                    className="w-7 h-7 transition-colors duration-300"
                    style={{
                      color: isHovered || isConnectedToHover ? node.color : "#94a3b8",
                      filter: isHovered || isConnectedToHover ? `drop-shadow(0 0 8px ${node.color}cc)` : "none"
                    }}
                  />
                </div>

                {/* Hotkey Badge and Action Label */}
                <div 
                  className="absolute top-[82px] flex flex-col items-center whitespace-nowrap text-center transition-all duration-300"
                  style={{
                    transform: `scale(${isHovered ? 1.05 : 1.0})`
                  }}
                >
                  <span 
                    className="text-xs font-bold text-foreground leading-none tracking-tight transition-all duration-300"
                  >
                    {node.label}
                  </span>
                  <span 
                    className="text-[9px] font-extrabold uppercase tracking-[0.2em] mt-1.5 transition-all duration-300 px-1.5 py-0.5 rounded bg-secondary border border-border"
                    style={{
                      color: isHovered || isConnectedToHover ? node.color : "#64748b"
                    }}
                  >
                    {node.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none bg-gradient-to-t from-background to-transparent opacity-60 z-0" />
    </div>
  );
}

