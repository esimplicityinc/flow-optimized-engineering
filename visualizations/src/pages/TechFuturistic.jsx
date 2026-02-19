import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { architectureData } from '../data/architectureData';

export default function TechFuturistic() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const getTasksByRegion = (region) => {
    return architectureData.taskAreas.filter(t => t.region === region);
  };

  return (
    <div className="min-h-screen bg-design-black relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(to right, rgba(50,35,189,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(50,35,189,0.15) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      {/* Flowing Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-twilight/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-twilight to-transparent"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.3 }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b-2 border-twilight/30 bg-design-black/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-twilight hover:text-twilight/80 transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-nunito font-bold uppercase tracking-wider">Back</span>
          </Link>
          <div className="text-right">
            <h1 className="text-xl font-carbona text-twilight uppercase tracking-widest">Tech / Futuristic</h1>
            <p className="text-xs font-nunito text-twilight/70 font-mono uppercase">Capability Matrix</p>
          </div>
        </div>
      </div>

      {/* Scope Boundary */}
      <div className="absolute top-24 left-8 right-8 bottom-8 border-4 border-dashed border-twilight/40 rounded-[40px] pointer-events-none z-0 shadow-[0_0_50px_rgba(50,35,189,0.3)]"></div>

      {/* Main Canvas */}
      <div className="relative w-full h-screen pt-20 px-12">
        
        {/* Cross-cutting Infrastructure */}
        <motion.div
          className="absolute top-36 left-1/2 -translate-x-1/2 w-[680px] z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="border-2 border-twilight rounded-2xl p-6 bg-design-black/90 backdrop-blur-md shadow-[0_0_50px_rgba(50,35,189,0.4)]">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center mb-3"
            >
              <div className="inline-block px-4 py-1 bg-twilight/20 border border-twilight rounded-full text-twilight text-xs font-nunito font-bold uppercase tracking-widest">
                Core System
              </div>
            </motion.div>
            <h2 className="text-xl font-carbona text-white text-center mb-2 uppercase tracking-wider">
              {architectureData.crossCuttingConcepts.label}
            </h2>
            <p className="text-xs font-nunito text-twilight/80 text-center mb-4 font-semibold">
              {architectureData.crossCuttingConcepts.description}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-nunito text-twilight font-mono">
              {architectureData.crossCuttingConcepts.capabilities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 bg-twilight/10 border border-twilight/30 px-3 py-2 rounded"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-twilight"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  ></motion.span>
                  <span>{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Governance Region */}
        <motion.div
          className="absolute top-[340px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-2 border-twilight/50 rounded-xl p-5 bg-design-black/80 backdrop-blur-md min-w-[380px] shadow-[0_0_30px_rgba(50,35,189,0.3)]">
            <h3 className="text-center text-sm font-nunito font-bold text-white mb-3 uppercase tracking-wider">Data Governance</h3>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Data Governance").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[170px] h-[100px] bg-design-black/60 backdrop-blur-sm border-2 rounded-lg transition-all duration-300 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-[0_0_30px_rgba(50,35,189,0.6)] scale-105' : 'border-twilight/30'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <motion.div className="w-2 h-2 rounded-full bg-twilight mx-auto mb-2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}></motion.div>
                    <div className="text-xs font-nunito font-semibold text-twilight/70 mb-1 font-mono">{task.name}</div>
                    <div className="text-xs font-nunito font-bold text-white">{task.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Acquisition & Discovery */}
        <motion.div
          className="absolute top-[500px] left-[40px] z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-left max-w-[280px] bg-design-black/80 backdrop-blur-sm p-5 rounded-xl border-2 border-twilight/50 shadow-[0_0_30px_rgba(50,35,189,0.3)]">
            <h3 className="text-base font-nunito font-bold text-white mb-2 uppercase tracking-wider">Acquisition & Discovery</h3>
            <p className="text-xs font-nunito text-twilight/80 leading-relaxed font-mono">
              {architectureData.visualRegions["Acquisition & Discovery"].description}
            </p>
          </div>
        </motion.div>

        {/* Insight & Action */}
        <motion.div
          className="absolute top-[580px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="border-2 border-twilight/50 rounded-xl p-5 bg-design-black/80 backdrop-blur-md min-w-[420px] shadow-[0_0_30px_rgba(50,35,189,0.3)]">
            <h3 className="text-center text-sm font-nunito font-bold text-white mb-2 uppercase tracking-wider">Insight & Action</h3>
            <p className="text-center text-xs font-nunito text-twilight/80 mb-3 font-mono">
              {architectureData.visualRegions["Insight & Action"].description}
            </p>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Insight & Action").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[190px] h-[100px] bg-design-black/60 backdrop-blur-sm border-2 rounded-lg transition-all duration-300 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-[0_0_30px_rgba(50,35,189,0.6)] scale-105' : 'border-twilight/30'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <motion.div className="w-2 h-2 rounded-full bg-twilight mx-auto mb-2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}></motion.div>
                    <div className="text-xs font-nunito font-semibold text-twilight/70 mb-1 font-mono">{task.name}</div>
                    <div className="text-xs font-nunito font-bold text-white">{task.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Atlas */}
        <motion.div
          className="absolute right-[40px] top-[360px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-4 items-center">
            <div className="writing-mode-vertical text-sm font-nunito font-bold text-twilight/80 whitespace-nowrap font-mono uppercase tracking-wider">
              {architectureData.visualRegions["Data Atlas"].description}
            </div>
            {getTasksByRegion("Data Atlas").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-5 w-[180px] h-[130px] bg-design-black/80 backdrop-blur-md border-2 rounded-xl transition-all duration-300 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-[0_0_30px_rgba(50,35,189,0.6)] scale-105' : 'border-twilight/50'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <h4 className="text-sm font-nunito font-bold text-white mb-2 uppercase tracking-wider">Data Atlas</h4>
                  <motion.div className="w-2 h-2 rounded-full bg-twilight mx-auto mb-2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}></motion.div>
                  <div className="text-xs font-nunito font-semibold text-twilight/70 mb-1 font-mono">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-white">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research & Consulting */}
        <motion.div
          className="absolute top-[160px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="border-2 border-twilight/50 rounded-xl p-5 bg-design-black/80 backdrop-blur-md min-w-[260px] shadow-[0_0_30px_rgba(50,35,189,0.3)]">
            <h3 className="text-center text-sm font-nunito font-bold text-white mb-2 uppercase tracking-wider">Research & Consulting</h3>
            <p className="text-center text-xs font-nunito text-twilight/80 mb-3 leading-relaxed font-mono">
              {architectureData.visualRegions["Research & Consulting"].description}
            </p>
            {getTasksByRegion("Research & Consulting").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 bg-design-black/60 backdrop-blur-sm border-2 rounded-lg transition-all duration-300 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-[0_0_30px_rgba(50,35,189,0.6)] scale-105' : 'border-twilight/30'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <motion.div className="w-2 h-2 rounded-full bg-twilight mx-auto mb-2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}></motion.div>
                  <div className="text-xs font-nunito font-semibold text-twilight/70 mb-1 font-mono">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-white">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance & Services */}
        <motion.div
          className="absolute top-[580px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="border-2 border-twilight/50 rounded-xl p-5 bg-design-black/80 backdrop-blur-md min-w-[260px] shadow-[0_0_30px_rgba(50,35,189,0.3)]">
            <h3 className="text-center text-sm font-nunito font-bold text-white mb-2 uppercase tracking-wider">Compliance & Services</h3>
            <p className="text-center text-xs font-nunito text-twilight/80 mb-3 leading-relaxed font-mono">
              {architectureData.visualRegions["Compliance & Services"].description}
            </p>
            {getTasksByRegion("Compliance & Services").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 bg-design-black/60 backdrop-blur-sm border-2 rounded-lg transition-all duration-300 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-[0_0_30px_rgba(50,35,189,0.6)] scale-105' : 'border-twilight/30'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <motion.div className="w-2 h-2 rounded-full bg-twilight mx-auto mb-2" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}></motion.div>
                  <div className="text-xs font-nunito font-semibold text-twilight/70 mb-1 font-mono">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-white">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-design-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              className="bg-design-black/95 backdrop-blur-md rounded-2xl p-10 max-w-3xl w-full border-4 border-twilight shadow-[0_0_50px_rgba(50,35,189,0.6)]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-twilight/30">
                <div>
                  <div className="inline-block px-3 py-1 bg-twilight/20 border border-twilight rounded text-twilight text-xs font-nunito font-bold uppercase tracking-wider mb-3">
                    Task Module
                  </div>
                  <div className="text-sm font-nunito font-semibold text-twilight/70 mb-1 font-mono">{selectedTask.name}</div>
                  <h2 className="text-3xl font-carbona text-white mb-2 uppercase tracking-wider">{selectedTask.title}</h2>
                  <div className="text-sm font-nunito text-twilight/80 font-mono">
                    Visual Region: <span className="font-bold text-white">{selectedTask.region}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 bg-twilight/20 hover:bg-twilight/30 rounded border border-twilight/50 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-twilight" />
                </button>
              </div>

              <div className="bg-twilight/10 border border-twilight/30 p-5 rounded-lg">
                <p className="text-sm font-nunito text-white leading-relaxed">
                  This is a peer capability domain. All seven task areas have equal structural standing with no hierarchical relationships, ownership, or implied sequence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-design-black/80 backdrop-blur-md border-t-2 border-twilight/30 py-2 text-center z-20">
        <div className="flex justify-center items-center gap-4 text-xs font-nunito font-mono text-twilight">
          <span className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-twilight"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.span>
            SYSTEM_ONLINE
          </span>
          <span>•</span>
          <span>CAPABILITY_MATRIX_ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
