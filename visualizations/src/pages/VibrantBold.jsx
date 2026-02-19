import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { architectureData } from '../data/architectureData';

export default function VibrantBold() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);

  const getTasksByRegion = (region) => {
    return architectureData.taskAreas.filter(t => t.region === region);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-pop via-persimmon-pop to-teal-pop relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm border-b-4 border-persimmon-pop p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-twilight hover:text-twilight/80 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="font-nunito font-bold text-lg">BACK</span>
        </Link>
        <div className="text-right">
          <h1 className="text-3xl font-carbona text-twilight">Vibrant / Bold</h1>
          <p className="text-sm font-nunito text-design-black font-semibold">High Energy Inventory</p>
        </div>
      </div>

      {/* Scope Boundary */}
      <div className="absolute top-28 left-8 right-8 bottom-8 border-4 border-dashed border-white rounded-[40px] pointer-events-none z-0 shadow-2xl"></div>

      {/* Main Canvas */}
      <div className="relative w-full h-screen pt-24 px-12">
        
        {/* Cross-cutting Infrastructure */}
        <motion.div
          className="absolute top-36 left-1/2 -translate-x-1/2 w-[680px] z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <div className="border-4 border-white rounded-3xl p-6 bg-gradient-to-br from-purple-pop to-teal-pop shadow-2xl">
            <h2 className="text-2xl font-carbona text-white text-center mb-2 drop-shadow-lg">
              {architectureData.crossCuttingConcepts.label}
            </h2>
            <p className="text-sm font-nunito text-white/95 text-center mb-4 font-semibold">
              {architectureData.crossCuttingConcepts.description}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm font-nunito text-white font-bold">
              {architectureData.crossCuttingConcepts.capabilities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="w-2 h-2 rounded-full bg-white"></span>
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
          <div className="border-4 border-white rounded-2xl p-5 bg-persimmon-pop/90 shadow-xl min-w-[380px]">
            <h3 className="text-center text-base font-nunito font-black text-white mb-3 uppercase">Data Governance</h3>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Data Governance").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[170px] h-[110px] bg-white border-4 rounded-2xl transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-persimmon-pop shadow-2xl scale-110' : 'border-white'}`}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="text-xs font-nunito font-bold text-design-black/70 mb-1">{task.name}</div>
                    <div className="text-sm font-nunito font-black text-design-black">{task.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Acquisition & Discovery */}
        <motion.div
          className="absolute top-[500px] left-[40px] z-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-left max-w-[280px] bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-xl border-4 border-teal-pop">
            <h3 className="text-lg font-nunito font-black text-design-black mb-2">Acquisition & Discovery</h3>
            <p className="text-xs font-nunito text-design-black/80 leading-relaxed font-semibold">
              {architectureData.visualRegions["Acquisition & Discovery"].description}
            </p>
          </div>
        </motion.div>

        {/* Insight & Action */}
        <motion.div
          className="absolute top-[580px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="border-4 border-white rounded-2xl p-5 bg-purple-pop/90 shadow-xl min-w-[420px]">
            <h3 className="text-center text-base font-nunito font-black text-white mb-2 uppercase">Insight & Action</h3>
            <p className="text-center text-xs font-nunito text-white/95 mb-3 font-semibold">
              {architectureData.visualRegions["Insight & Action"].description}
            </p>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Insight & Action").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[190px] h-[110px] bg-white border-4 rounded-2xl transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-purple-pop shadow-2xl scale-110' : 'border-white'}`}
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="text-xs font-nunito font-bold text-design-black/70 mb-1">{task.name}</div>
                    <div className="text-sm font-nunito font-black text-design-black">{task.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Atlas */}
        <motion.div
          className="absolute right-[40px] top-[360px] z-10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-4 items-center">
            <div className="writing-mode-vertical text-base font-nunito font-black text-white whitespace-nowrap drop-shadow-lg">
              {architectureData.visualRegions["Data Atlas"].description}
            </div>
            {getTasksByRegion("Data Atlas").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-5 w-[180px] h-[140px] bg-white border-4 rounded-2xl transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-teal-pop shadow-2xl scale-110' : 'border-white'}`}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <h4 className="text-base font-nunito font-black text-design-black mb-2">Data Atlas</h4>
                  <div className="text-xs font-nunito font-bold text-design-black/70 mb-1">{task.name}</div>
                  <div className="text-sm font-nunito font-black text-design-black">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research & Consulting */}
        <motion.div
          className="absolute top-[150px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="border-4 border-white rounded-2xl p-5 bg-teal-pop/90 shadow-xl min-w-[260px]">
            <h3 className="text-center text-sm font-nunito font-black text-white mb-2 uppercase">Research & Consulting</h3>
            <p className="text-center text-xs font-nunito text-white/95 mb-3 leading-relaxed font-semibold">
              {architectureData.visualRegions["Research & Consulting"].description}
            </p>
            {getTasksByRegion("Research & Consulting").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 bg-white border-4 rounded-2xl transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-teal-pop shadow-2xl scale-110' : 'border-white'}`}
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-xs font-nunito font-bold text-design-black/70 mb-1">{task.name}</div>
                  <div className="text-sm font-nunito font-black text-design-black">{task.title}</div>
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
          <div className="border-4 border-white rounded-2xl p-5 bg-purple-pop/90 shadow-xl min-w-[260px]">
            <h3 className="text-center text-sm font-nunito font-black text-white mb-2 uppercase">Compliance & Services</h3>
            <p className="text-center text-xs font-nunito text-white/95 mb-3 leading-relaxed font-semibold">
              {architectureData.visualRegions["Compliance & Services"].description}
            </p>
            {getTasksByRegion("Compliance & Services").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 bg-white border-4 rounded-2xl transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-persimmon-pop shadow-2xl scale-110' : 'border-white'}`}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-xs font-nunito font-bold text-design-black/70 mb-1">{task.name}</div>
                  <div className="text-sm font-nunito font-black text-design-black">{task.title}</div>
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
            className="fixed inset-0 bg-design-black/50 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-12 max-w-xl w-full shadow-2xl border-8 border-purple-pop"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-nunito font-bold text-design-black/60 mb-1">{selectedTask.name}</div>
                  <h2 className="text-3xl font-carbona text-twilight">{selectedTask.title}</h2>
                  <div className="mt-2 text-sm font-nunito text-design-black/70 font-semibold">
                    Visual Region: <span className="font-black text-design-black">{selectedTask.region}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-3 bg-persimmon-pop hover:bg-persimmon-pop/80 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-7 h-7 text-white" />
                </button>
              </div>

              <div className="bg-purple-tint p-5 rounded-2xl">
                <p className="text-sm font-nunito text-design-black leading-relaxed font-semibold">
                  This is a peer capability domain. All seven task areas have equal structural standing with no hierarchical relationships, ownership, or implied sequence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
