import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Mail, Download, Briefcase, GraduationCap, Award, ArrowRight, ExternalLink, Menu, X, Send, Terminal, Code2, Zap, Shield, Database, Globe, ChevronDown } from 'lucide-react';
import resumePdf from './resume/Harshal Jambhale Resume.pdf';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

/* ─── Typing Hook ─── */
function useTypingEffect(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer;

    if (!isDeleting && charIndex < currentText.length) {
      timer = setTimeout(() => setCharIndex(c => c + 1), typingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(c => c - 1), deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex(i => (i + 1) % texts.length);
    }

    setDisplayText(currentText.slice(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

/* ─── Section Header ─── */
function SectionHeader({ label, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-indigo-500 to-transparent" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">{label}</span>
      </div>
      <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">{title}</h3>
      {description && <p className="mt-2 text-gray-500 max-w-lg">{description}</p>}
    </motion.div>
  );
}

/* ─── Hero Visual (sphere wireframe orb) ─── */
/* ─── Skill Constellation — 3D rotating skill network graph ─── */
function SkillConstellation() {
  const [hovered, setHovered] = React.useState(null);

  // Skills as nodes in 3D space, positioned around a central Java hub
  const nodes = [
    { id: 'java', label: 'Java', icon: '☕', color: '#f97316', x: 0, y: 0, z: 0, size: 52, primary: true, desc: 'Core language' },
    { id: 'spring', label: 'Spring Boot', icon: '🍃', color: '#22c55e', x: 130, y: -60, z: 40, size: 40, desc: 'Framework' },
    { id: 'security', label: 'Spring Security', icon: '🛡️', color: '#ef4444', x: -120, y: -80, z: -30, size: 36, desc: 'Auth & RBAC' },
    { id: 'hibernate', label: 'Hibernate / JPA', icon: '💎', color: '#8b5cf6', x: 80, y: 100, z: -50, size: 38, desc: 'ORM' },
    { id: 'rest', label: 'REST APIs', icon: '🔗', color: '#06b6d4', x: -100, y: 90, z: 60, size: 36, desc: 'Architecture' },
    { id: 'postgres', label: 'PostgreSQL', icon: '🐘', color: '#6366f1', x: -50, y: -130, z: 50, size: 38, desc: 'Database' },
    { id: 'react', label: 'React.js', icon: '⚛️', color: '#06b6d4', x: 140, y: 50, z: -60, size: 34, desc: 'Frontend' },
  ];

  // Connections between related skills
  const connections = [
    { from: 'java', to: 'spring', strength: 1 },
    { from: 'java', to: 'security', strength: 0.8 },
    { from: 'java', to: 'hibernate', strength: 0.9 },
    { from: 'java', to: 'rest', strength: 0.85 },
    { from: 'java', to: 'postgres', strength: 0.7 },
    { from: 'spring', to: 'security', strength: 0.9 },
    { from: 'spring', to: 'hibernate', strength: 0.85 },
    { from: 'spring', to: 'rest', strength: 0.8 },
    { from: 'hibernate', to: 'postgres', strength: 0.9 },
    { from: 'rest', to: 'react', strength: 0.7 },
  ];

  // Floating particles for ambient effect
  const particles = Array.from({ length: 15 }, (_, i) => ({
    x: Math.sin(i * 1.3) * 180,
    y: Math.cos(i * 0.9) * 180,
    size: 1.5 + Math.random() * 2,
    opacity: 0.12 + Math.random() * 0.18,
  }));

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Is a node connected to the hovered node?
  const isRelated = (nodeId) => {
    if (!hovered) return false;
    return connections.some(c =>
      (c.from === hovered && c.to === nodeId) ||
      (c.to === hovered && c.from === nodeId)
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true" style={{ perspective: 800 }}>
      {/* Subtle grid background */}
      <div
        className="absolute w-[420px] h-[420px] opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          borderRadius: '12px',
        }}
      />
      {/* Background ambient glows */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-violet-500/8 blur-[80px]" />

      {/* Static constellation container — stable, no rotation */}
      <div
        className="absolute"
        style={{ width: 400, height: 400 }}
      >
        {/* Connection lines (SVG overlay projected flat) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="-200 -200 400 400" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(160,160,255,0.35)" />
              <stop offset="50%" stopColor="rgba(200,180,255,0.5)" />
              <stop offset="100%" stopColor="rgba(160,160,255,0.35)" />
            </linearGradient>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(200,180,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {connections.map((c, i) => {
            const a = nodeMap[c.from];
            const b = nodeMap[c.to];

            return (
              <g key={`line-${i}`}>
                {/* Base connection line */}
                <motion.line
                  x1={a.x} y1={-a.y}
                  x2={b.x} y2={-b.y}
                  stroke="url(#lineGrad)"
                  strokeWidth={1 + c.strength * 0.8}
                  strokeDasharray="4 6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.15, 0.45, 0.15] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Animated data-flow particle along the line */}
                <motion.circle
                  r={1.8}
                  fill="rgba(200,180,255,0.8)"
                  animate={{
                    cx: [a.x, b.x],
                    cy: [-a.y, -b.y],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.4,
                  }}
                  style={{ filter: 'blur(0.5px)' }}
                />
                <motion.circle
                  r={1}
                  fill="rgba(255,255,255,0.6)"
                  animate={{
                    cx: [a.x, b.x],
                    cy: [-a.y, -b.y],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.4 + 0.6,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Ambient static particles */}
        {particles.map((p, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-indigo-400"
            style={{
              width: p.size,
              height: p.size,
              left: 200 + p.x,
              top: 200 + p.y,
              opacity: p.opacity,
              filter: `blur(${p.size > 2.5 ? 1 : 0}px)`,
            }}
          />
        ))}

        {/* Skill nodes — hover to enlarge */}
        {nodes.map((n, i) => {
          const isHovered = hovered === n.id;
          const isDimmed = hovered && !isHovered && !isRelated(n.id);
          const hoverScale = isHovered ? 1.55 : 1;
          const dimOpacity = isDimmed ? 0.3 : 1;
          const hoverZ = isHovered ? 30 : n.primary ? 20 : 10;
          const hoverSize = isHovered ? n.size * 1.55 : n.size;
          const hoverFontSize = isHovered ? (n.primary ? 34 : 28) : (n.primary ? 22 : 16);

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: dimOpacity,
                scale: hoverScale,
              }}
              transition={{
                opacity: { duration: 0.6, delay: i * 0.12 },
                scale: { duration: 0.3, type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="absolute flex flex-col items-center gap-1.5 cursor-pointer select-none"
              style={{
                left: 200 + n.x - n.size / 2,
                top: 200 - n.y - n.size / 2,
                zIndex: hoverZ,
              }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Node circle */}
              <div
                className="relative flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: hoverSize,
                  height: hoverSize,
                  background: isHovered
                    ? `radial-gradient(circle at 35% 30%, ${n.color}70, ${n.color}35, ${n.color}15)`
                    : `radial-gradient(circle at 35% 30%, ${n.color}40, ${n.color}18, ${n.color}08)`,
                  border: `1.5px solid ${isHovered ? n.color + '90' : n.color + '50'}`,
                  boxShadow: isHovered
                    ? `0 0 40px ${n.color}55, 0 0 80px ${n.color}25, inset 0 0 20px ${n.color}15`
                    : `0 0 ${n.primary ? 30 : 18}px ${n.color}30, 0 0 ${n.primary ? 60 : 35}px ${n.color}12`,
                }}
              >
                <span style={{ fontSize: hoverFontSize, transition: 'font-size 0.3s' }}>{n.icon}</span>
                {/* Pulse ring for primary (only when not hovered) */}
                {n.primary && !isHovered && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: `${n.color}30` }}
                  />
                )}
                {/* Glow ring on hover */}
                {isHovered && (
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-[-4px] rounded-full border-2"
                    style={{ borderColor: `${n.color}50` }}
                  />
                )}
              </div>
              {/* Label + description on hover */}
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="text-[10px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300"
                  style={{
                    color: isHovered ? '#ffffff' : n.color,
                    textShadow: isHovered ? `0 0 12px ${n.color}60` : `0 0 10px ${n.color}40`,
                    fontSize: isHovered ? '12px' : '10px',
                  }}
                >
                  {n.label}
                </span>
                {/* Description tooltip on hover */}
                {isHovered && n.desc && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] text-gray-400 whitespace-nowrap"
                  >
                    {n.desc}
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Code Window (career.ts style) ─── */
function CodeWindow() {

  const codeLines = [
    { tokens: [
      { text: 'import', cls: 'text-purple-400' },
      { text: ' { JavaDeveloper } ', cls: 'text-white' },
      { text: 'from', cls: 'text-purple-400' },
      { text: ' "@future/software-engineer"', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [] },
    { tokens: [] },
    { tokens: [
      { text: 'public', cls: 'text-purple-400' },
      { text: ' class ', cls: 'text-purple-400' },
      { text: 'HarshalJambhale', cls: 'text-amber-400' },
      { text: ' implements ', cls: 'text-purple-400' },
      { text: 'JavaDeveloper', cls: 'text-cyan-400' },
      { text: ' {', cls: 'text-gray-400' },
    ]},
    { tokens: [] },
    { tokens: [
      { text: '    private final', cls: 'text-purple-400' },
      { text: ' String role = ', cls: 'text-cyan-400' },
      { text: '"Java Backend Developer"', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [] },
    { tokens: [
      { text: '    private final', cls: 'text-purple-400' },
      { text: ' String experience = ', cls: 'text-cyan-400' },
      { text: '"9+ Months Professional Experience"', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [] },
    { tokens: [
      { text: '    public', cls: 'text-purple-400' },
      { text: ' HiringDecision ', cls: 'text-cyan-400' },
      { text: 'getHiringDecision', cls: 'text-amber-400' },
      { text: '() {', cls: 'text-gray-400' },
    ]},
    { tokens: [] },
    { tokens: [
      { text: '        Candidate candidate = ', cls: 'text-blue-300' },
      { text: 'new', cls: 'text-purple-400' },
      { text: ' ', cls: '' },
      { text: 'Candidate', cls: 'text-cyan-400' },
      { text: '(', cls: 'text-gray-400' },
    ]},
    { tokens: [
      { text: '            "Harshal Jambhale"', cls: 'text-emerald-400' },
      { text: ',', cls: 'text-gray-500' },
      { text: ' role', cls: 'text-blue-300' },
      { text: ',', cls: 'text-gray-500' },
    ]},
    { tokens: [
      { text: '            experience', cls: 'text-blue-300' },
      { text: ',', cls: 'text-gray-500' },
      { text: ' coreSkills', cls: 'text-blue-300' },
    ]},
    { tokens: [
      { text: '        );', cls: 'text-gray-400' },
    ]},
    { tokens: [] },
    { tokens: [
      { text: '        candidate.', cls: 'text-blue-300' },
      { text: 'canBuild', cls: 'text-amber-400' },
      { text: '("Secure REST APIs")', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [
      { text: '        candidate.', cls: 'text-blue-300' },
      { text: 'canDesign', cls: 'text-amber-400' },
      { text: '("Scalable Backend Systems")', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [
      { text: '        candidate.', cls: 'text-blue-300' },
      { text: 'canImplement', cls: 'text-amber-400' },
      { text: '("JWT & Role-Based Security")', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [
      { text: '        candidate.', cls: 'text-blue-300' },
      { text: 'canIntegrate', cls: 'text-amber-400' },
      { text: '("React + Spring Boot")', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [] },
    { tokens: [
      { text: '        return', cls: 'text-purple-400' },
      { text: ' HiringDecision', cls: 'text-cyan-400' },
    ]},
    { tokens: [
      { text: '            .', cls: 'text-blue-300' },
      { text: 'forCandidate', cls: 'text-amber-400' },
      { text: '(candidate)', cls: 'text-blue-300' },
    ]},
    { tokens: [
      { text: '            .', cls: 'text-blue-300' },
      { text: 'recommend', cls: 'text-amber-400' },
      { text: '("INTERVIEW")', cls: 'text-emerald-400' },
      { text: ';', cls: 'text-gray-500' },
    ]},
    { tokens: [
      { text: '    }', cls: 'text-gray-400' },
    ]},
    { tokens: [
      { text: '}', cls: 'text-gray-400' },
    ]},
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow behind */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[360px] h-[360px] rounded-full bg-indigo-600 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[240px] h-[240px] rounded-full bg-violet-500 blur-[80px]"
      />

      {/* Code Window + Buttons wrapper */}
      <div className="relative flex flex-col items-center">
        {/* Code Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.3 },
            scale: { duration: 0.7, delay: 0.3 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          }}
          className="relative w-[460px] rounded-2xl border border-indigo-500/20 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e 0%, #12121f 50%, #0f0f1a 100%)',
            boxShadow: '0 0 80px rgba(99,102,241,0.15), 0 0 40px rgba(139,92,246,0.06), 0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Pulsing border glow overlay */}
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-20"
            style={{ border: '1px solid rgba(99,102,241,0.2)', boxShadow: 'inset 0 0 20px rgba(99,102,241,0.04)' }}
          />

          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-indigo-400">{'>'}</span>
              <span className="font-mono">HiringDecision.java</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Code body */}
          <div className="px-6 py-5 font-mono text-[12px] leading-[1.75] overflow-hidden">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.05 }}
                className="flex hover:bg-white/[0.02] rounded px-1 -mx-1 transition-colors duration-200"
              >
                <span className="w-7 text-right text-gray-600 select-none mr-4 shrink-0 tabular-nums">
                  {line.tokens.length > 0 ? i + 1 : ''}
                </span>
                <span className="whitespace-pre">
                  {line.tokens.map((tok, j) => (
                    <span key={j} className={tok.cls}>{tok.text}</span>
                  ))}
                </span>
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex"
            >
              <span className="w-7 mr-4 shrink-0" />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-[2px] h-4 bg-indigo-400"
              />
            </motion.div>
          </div>
        </motion.div>


      </div>

      {/* Floating badges — repositioned for smaller window */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.5 },
          x: { duration: 0.5, delay: 1.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 },
        }}
        className="absolute -right-3 top-14 z-10"
      >
        <div className="px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[11px] font-bold tracking-wide backdrop-blur-sm shadow-lg shadow-amber-500/10">
          ☕ Java Enthusiast ✨
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.8 },
          x: { duration: 0.5, delay: 1.8 },
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 },
        }}
        className="absolute -left-3 bottom-14 z-10"
      >
        <div className="px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold tracking-wide backdrop-blur-sm shadow-lg shadow-cyan-500/10">
          🚀 Interview Ready
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Skill Badge ─── */
function SkillBadge({ name, color }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        background: `${color}10`,
        borderColor: `${color}30`,
        color: color,
      }}
    >
      {name}
    </span>
  );
}

/* ─── Main Component ─── */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [modalProject, setModalProject] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const form = useRef();

  const typedText = useTypingEffect([
    'Java Backend Developer',
    'Spring Boot Specialist',
    'RESTful API Architect',
  ]);

  // Track active section for nav
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm('service_w71vk3d', 'template_fi4wxun', form.current, {
        publicKey: 'BsX9oRL395mCOnOWs',
      })
      .then(
        () => {
          toast.success('Message sent successfully!', {
            duration: 4000,
            position: 'top-center',
            style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid rgba(99,102,241,0.3)' },
          });
          form.current.reset();
          setIsSending(false);
        },
        () => {
          toast.error('Failed to send message.', {
            duration: 4000,
            position: 'top-center',
            style: { background: '#1e1b4b', color: '#e0e7ff', border: '1px solid rgba(99,102,241,0.3)' },
          });
          setIsSending(false);
        }
      );
  };

  const projects = [
    {
      id: 1,
      title: 'E-Notes App',
      short: 'Secure notes app deployed on AWS',
      desc: 'Built a secure notes application using React and Spring Boot, with JWT authentication, OAuth 2.0 login (Google, GitHub), and role-based access control (RBAC). Integrated AWS S3 for file upload and storage, enabling secure, user-specific document management with scalable cloud storage. Deployed on AWS using Docker containers within a VPC, configuring Auto Scaling and an Application Load Balancer for high availability.',
      tech: ['Java', 'Spring Boot', 'React.js', 'AWS S3', 'AWS EC2', 'AWS VPC', 'Docker', 'JWT', 'OAuth'],
      github: 'https://github.com/Harshal14753/ENotes',
      live: 'https://e-notes-frontend.vercel.app/home',
      icon: <Globe size={20} />,
      color: '#6366f1',
    },
    {
      id: 2,
      title: 'AI IT Job Portal',
      short: 'Multi-role job portal powered by Gemini AI',
      desc: 'Built a multi-role job portal (Candidates, Recruiters, Admins) with AI-powered profile setup using Google Gemini API to parse resumes and auto-extract candidate details. Developed an AI-driven auto-apply system using Gemini API to compute a job-candidate match score and auto-apply based on configurable thresholds. Implemented secure authentication with email OTP verification and role-based dashboards for candidates, recruiters, and admins, with optimized backend query performance.',
      tech: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT', 'React.js', 'Google Gemini API'],
      github: '',
      live: '',
      icon: <Zap size={20} />,
      color: '#8b5cf6',
    },
    {
      id: 3,
      title: 'Chat Verse',
      short: 'WhatsApp-style real-time messaging',
      desc: 'Built a WhatsApp-style real-time messaging platform using WebSocket and STOMP protocol, supporting concurrent connections for up to 10 simultaneous users with secure authentication. Designed persistent chat history storage and implemented one-to-one messaging with reliable message delivery across concurrent WebSocket sessions.',
      tech: ['Java', 'Spring Boot', 'WebSocket', 'STOMP', 'React.js'],
      github: 'https://github.com/Harshal14753/Chat-Verse',
      live: 'https://chat-verse-frontend-seven.vercel.app',
      icon: <Terminal size={20} />,
      color: '#06b6d4',
    },
  ];

  const skillGroups = [
    { category: 'Backend', icon: <Code2 size={16} />, skills: [{ name: 'Java', color: '#f97316' }, { name: 'Spring Boot', color: '#22c55e' }, { name: 'Spring Security & JWT', color: '#ef4444' }, { name: 'Hibernate/JPA', color: '#8b5cf6' }, { name: 'REST APIs', color: '#06b6d4' }, { name: 'JUnit', color: '#eab308' }, { name: 'Mockito', color: '#ec4899' }] },
    { category: 'Frontend', icon: <Globe size={16} />, skills: [{ name: 'React.js', color: '#06b6d4' }, { name: 'JavaScript', color: '#eab308' }, { name: 'Tailwind CSS', color: '#06b6d4' }, { name: 'HTML5', color: '#f97316' }, { name: 'CSS3', color: '#3b82f6' }] },
    { category: 'Databases', icon: <Database size={16} />, skills: [{ name: 'PostgreSQL', color: '#6366f1' }, { name: 'MySQL', color: '#3b82f6' }, { name: 'MongoDB', color: '#22c55e' }, { name: 'Redis', color: '#ef4444' }] },
    { category: 'Cloud & DevOps', icon: <Shield size={16} />, skills: [{ name: 'AWS EC2', color: '#f97316' }, { name: 'AWS S3', color: '#22c55e' }, { name: 'AWS VPC', color: '#8b5cf6' }, { name: 'Docker', color: '#3b82f6' }, { name: 'Linux', color: '#eab308' }, { name: 'Git', color: '#ef4444' }] },
  ];

  const topSkills = [
    { name: 'Java', color: '#f97316' },
    { name: 'Spring Boot', color: '#22c55e' },
    { name: 'Spring Security', color: '#ef4444' },
    { name: 'Hibernate/JPA', color: '#8b5cf6' },
    { name: 'REST APIs', color: '#06b6d4' },
    { name: 'PostgreSQL', color: '#6366f1' },
    { name: 'React.js', color: '#06b6d4' },
  ];

  const experience = [
    {
      role: 'Java Backend Developer',
      subtitle: 'Intern → Full-time',
      company: 'Insonsoft Pvt. Ltd.',
      period: 'Sep 2025 – May 2026',
      tech: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate', 'PostgreSQL', 'JWT', 'REST APIs', 'React', 'Git'],
      points: [
        'Earned promotion from Intern to Full-time Java Backend Developer within 9 months by consistently delivering production-ready backend features and demonstrating strong technical ownership across enterprise Java applications.',
        'Designed and developed secure RESTful APIs for 15+ core modules using Java, Spring Boot, Spring Security, Hibernate/JPA, and PostgreSQL, implementing JWT-based authentication and Role-Based Access Control (RBAC) to protect sensitive data.',
        'Optimized database query performance by 40% through indexing, query refactoring, unit testing components, and Hibernate tuning, reducing API response times and improving overall application scalability.',
        'Collaborated in an 8-person cross-functional team using Git/GitHub and Agile workflows, conducting code reviews, debugging production issues, and delivering maintainable backend solutions across the full SDLC.',
      ],
    },
  ];

  const education = {
    degree: 'Bachelor of Engineering in Information Technology (B.E.)',
    school: 'Savitribai Phule Pune University',
    period: 'Sep 2022 – June 2026',
    score: '8.01 CGPA',
  };

  const certificates = [{ title: 'Data Structures and Algorithms — built a strong foundation in DSA' }];

  const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Harshal14753' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/harshal-jambhale-3a569027b/' },
    { name: 'Email', icon: Mail, url: 'mailto:harshaljambhale01@gmail.com' },
  ];

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 overflow-x-hidden">
      <Toaster />


      {/* ─── Background Grid ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ─── Navbar ─── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5"
        style={{ background: 'rgba(10,10,15,0.7)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              HJ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold tracking-wide">HARSHAL</h1>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">Backend Developer</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={resumePdf}
              download="Harshal_Jambhale_Resume.pdf"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              aria-label="toggle theme"
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/5"
              style={{ background: 'rgba(10,10,15,0.95)' }}
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                      activeSection === link.id ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── Hero ─── */}
      <section id="about" className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-indigo-300">Available for opportunities</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Harshal
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3"
            >
              <span className="text-xl md:text-2xl text-gray-400 font-light">
                I'm a{' '}
                <span className="text-indigo-400 font-semibold">
                  {typedText}
                  <span className="animate-pulse text-indigo-400">|</span>
                </span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-gray-500 max-w-lg leading-relaxed text-base"
            >
              Building secure, scalable backend services with{' '}
              <span className="text-indigo-400 font-medium">Java</span>,{' '}
              <span className="text-indigo-400 font-medium">Spring Boot</span>, and{' '}
              <span className="text-indigo-400 font-medium">React</span>.
              Strong foundation in DSA with hands-on AWS experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                Hire Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex gap-3"
            >
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 hover:scale-110 transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>

            {/* Top Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-3 font-semibold">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((s) => (
                  <SkillBadge key={s.name} name={s.name} color={s.color} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hero visual — code window on lg+ */}
          <div className="hidden lg:flex items-center justify-center">
            <CodeWindow />
          </div>
        </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>

      </section>

      {/* ─── Experience ─── */}
      <section id="experience" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Experience" title="Where I've Worked" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/20 to-transparent hidden md:block" />

            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative md:pl-14 mb-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-8 w-3 h-3 rounded-full bg-indigo-500 border-4 border-[#0a0a0f] shadow-lg shadow-indigo-500/50 hidden md:block" />

                <div className="group rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:p-8 hover:border-indigo-500/20 transition-all duration-500">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                      <p className="text-sm text-indigo-400 mt-1">{exp.company} · {exp.subtitle}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3 text-sm text-gray-400">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500/60 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section id="projects" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Projects" title="Featured Work" description="Projects that showcase my expertise in backend development and full-stack engineering." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px at 50% 0%, ${p.color}08, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${p.color}15`, color: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div className="flex gap-2">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition" aria-label="GitHub">
                          <Github size={14} />
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition" aria-label="Live demo">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">{p.title}</h4>
                  <p className="text-sm text-gray-500 mb-3">{p.short}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-3">{p.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 5 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        +{p.tech.length - 5}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setModalProject(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition group/link"
                  >
                    View Details
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Skills" title="Technical Arsenal" description="Technologies and tools I use to build robust software." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-6 hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    {group.icon}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">{group.category}</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <SkillBadge key={s.name} name={s.name} color={s.color} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Education ─── */}
      <section id="education" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Education" title="Academic Background" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-indigo-500/20 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{education.degree}</h4>
                  <p className="text-sm text-indigo-400 mt-1">{education.school}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>{education.period}</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {education.score}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-indigo-500/20 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Certificates & Achievements</h4>
                  <ul className="mt-3 space-y-2">
                    {certificates.map((c) => (
                      <li key={c.title} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        {c.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Contact" title="Let's Connect" description="Have a project in mind? Let's build something great together." />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6">
                <h4 className="text-lg font-bold text-white mb-2">Get in touch</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Email me at{' '}
                  <a href="mailto:harshaljambhale01@gmail.com" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                    harshaljambhale01@gmail.com
                  </a>{' '}
                  or use the form.
                </p>

                <div className="mt-6 space-y-4">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-indigo-400 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                        <s.icon size={16} />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {s.url.replace('mailto:', '').replace('https://', '')}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form
                ref={form}
                onSubmit={sendEmail}
                className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Name</label>
                    <input
                      required
                      placeholder="Your name"
                      type="text"
                      name="from_name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                    <input
                      required
                      placeholder="your@email.com"
                      type="email"
                      name="from_email"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Message</label>
                  <textarea
                    required
                    placeholder="Tell me about your project..."
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>© {new Date().getFullYear()} Harshal Jambhale · Built with React + Tailwind</div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Harshal14753" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">GitHub</a>
            <a href="https://www.linkedin.com/in/harshal-jambhale-3a569027b/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* ─── Project Modal ─── */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl border border-white/10 bg-[#12121a] p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white">{modalProject.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{modalProject.short}</p>
                </div>
                <button
                  onClick={() => setModalProject(null)}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5">{modalProject.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {modalProject.tech.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {modalProject.github && (
                  <a
                    href={modalProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/5 transition"
                  >
                    <Github size={14} />
                    View Code
                  </a>
                )}
                {modalProject.live && (
                  <a
                    href={modalProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
