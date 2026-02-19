import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { architectureData } from '../data/architectureData';

export default function ModernMinimalist() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);

  const getTasksByRegion = (region) => {
    return architectureData.taskAreas.filter(t => t.region === region);
  };

  const TaskAreaCard = ({ task, position }) => {
    const isHovered = hoveredTask === task.id;

    return (
      <motion.div
        onClick={() => setSelectedTask(task)}
        onHoverStart={() => setHoveredTask(task.id)}
        onHoverEnd={() => setHoveredTask(null)}
        className={`absolute ${position} cursor-pointer z-10`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`
          p-4 w-[160px] h-[110px]
          bg-white rounded-lg shadow-sm
          border-2 transition-all duration-200
          ${isHovered ? 'border-twilight shadow-md' : 'border-pale-purple'}
          flex flex-col justify-center
        `}>
          <div className="text-center">
            <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1.5">{task.name}</div>
            <div className="text-sm font-nunito font-bold text-design-black leading-tight">{task.title}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-light-grey relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white border-b border-pale-purple p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-twilight hover:text-twilight/80 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-nunito font-semibold">Back to Styles</span>
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-carbona text-twilight">Modern / Minimalist</h1>
          <p className="text-sm font-nunito text-design-black/70">Capability Inventory</p>
        </div>
      </div>

      {/* Scope Boundary */}
      <div className="absolute top-28 left-8 right-8 bottom-8 border-4 border-dashed border-pale-purple rounded-[40px] pointer-events-none z-0"></div>

      {/* Main Canvas */}
      <div className="relative w-full h-screen pt-24 px-12">
        
        {/* Cross-cutting Infrastructure - TOP CENTER */}
        <motion.div
          className="absolute top-36 left-1/2 -translate-x-1/2 w-[680px] z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="border-2 border-dashed border-twilight/30 rounded-2xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-carbona text-twilight text-center mb-2">
              {architectureData.crossCuttingConcepts.label}
            </h2>
            <p className="text-xs font-nunito text-design-black/70 text-center mb-4">
              {architectureData.crossCuttingConcepts.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-nunito text-design-black">
              {architectureData.crossCuttingConcepts.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-pale-purple/50 px-3 py-1.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-twilight"></span>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Governance Region - TOP-CENTER */}
        <motion.div
          className="absolute top-[320px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="border border-pale-purple rounded-xl p-4 bg-white shadow-sm min-w-[360px]">
            <h3 className="text-center text-sm font-nunito font-bold text-design-black mb-3">Data Governance</h3>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Data Governance").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[160px] h-[100px] bg-white border-2 rounded-lg transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-md scale-105' : 'border-pale-purple'}`}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-center">
                    <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1">{task.name}</div>
                    <div className="text-xs font-nunito font-bold text-design-black">{task.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Acquisition & Discovery - LEFT */}
        <motion.div
          className="absolute top-[480px] left-[50px] z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-left max-w-[280px]">
            <h3 className="text-base font-nunito font-bold text-design-black mb-1">Acquisition & Discovery</h3>
            <p className="text-xs font-nunito text-design-black/70 leading-relaxed">
              {architectureData.visualRegions["Acquisition & Discovery"].description}
            </p>
          </div>
        </motion.div>

        {/* Insight & Action - BOTTOM CENTER */}
        <motion.div
          className="absolute top-[560px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="border border-pale-purple rounded-xl p-4 bg-white shadow-sm min-w-[400px]">
            <h3 className="text-center text-sm font-nunito font-bold text-design-black mb-2">Insight & Action</h3>
            <p className="text-center text-xs font-nunito text-design-black/70 mb-3">
              {architectureData.visualRegions["Insight & Action"].description}
            </p>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Insight & Action").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[180px] h-[100px] bg-white border-2 rounded-lg transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-md scale-105' : 'border-pale-purple'}`}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-center">
                    <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1">{task.name}</div>
                    <div className="text-xs font-nunito font-bold text-design-black">{task.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Atlas - RIGHT VERTICAL */}
        <motion.div
          className="absolute right-[50px] top-[340px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-3 items-center">
            <div className="writing-mode-vertical text-sm font-nunito font-semibold text-design-black/70 whitespace-nowrap">
              {architectureData.visualRegions["Data Atlas"].description}
            </div>
            {getTasksByRegion("Data Atlas").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 w-[160px] h-[120px] bg-white border-2 rounded-lg transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-md scale-105' : 'border-pale-purple'}`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-center">
                  <h4 className="text-sm font-nunito font-bold text-design-black mb-2">Data Atlas</h4>
                  <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-design-black">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research & Consulting - TOP RIGHT */}
        <motion.div
          className="absolute top-[160px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="border border-pale-purple rounded-xl p-4 bg-white shadow-sm min-w-[240px]">
            <h3 className="text-center text-sm font-nunito font-bold text-design-black mb-2">Research & Consulting</h3>
            <p className="text-center text-xs font-nunito text-design-black/70 mb-3 leading-relaxed">
              {architectureData.visualRegions["Research & Consulting"].description}
            </p>
            {getTasksByRegion("Research & Consulting").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 bg-white border-2 rounded-lg transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-md scale-105' : 'border-pale-purple'}`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-center">
                  <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-design-black">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance & Services - BOTTOM RIGHT */}
        <motion.div
          className="absolute top-[560px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="border border-pale-purple rounded-xl p-4 bg-white shadow-sm min-w-[240px]">
            <h3 className="text-center text-sm font-nunito font-bold text-design-black mb-2">Compliance & Services</h3>
            <p className="text-center text-xs font-nunito text-design-black/70 mb-3 leading-relaxed">
              {architectureData.visualRegions["Compliance & Services"].description}
            </p>
            {getTasksByRegion("Compliance & Services").map((task) => (
              <motion.div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                onHoverStart={() => setHoveredTask(task.id)}
                onHoverEnd={() => setHoveredTask(null)}
                className={`cursor-pointer p-4 bg-white border-2 rounded-lg transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-md scale-105' : 'border-pale-purple'}`}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-center">
                  <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-design-black">{task.title}</div>
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
            className="fixed inset-0 bg-design-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-10 max-w-xl w-full shadow-2xl border-t-4 border-twilight"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-nunito font-semibold text-design-black/60 mb-1">{selectedTask.name}</div>
                  <h2 className="text-2xl font-carbona text-twilight">{selectedTask.title}</h2>
                  <div className="mt-2 text-sm font-nunito text-design-black/70">
                    Visual Region: <span className="font-bold text-design-black">{selectedTask.region}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 hover:bg-light-grey rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-design-black" />
                </button>
              </div>

              <div className="bg-pale-purple/30 p-4 rounded-lg">
                <p className="text-sm font-nunito text-design-black leading-relaxed">
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
