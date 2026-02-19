import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { architectureData } from '../data/architectureData';

export default function CorporateProfessional() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);

  const getTasksByRegion = (region) => {
    return architectureData.taskAreas.filter(t => t.region === region);
  };

  return (
    <div className="min-h-screen bg-light-grey relative">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #3223BD 1px, transparent 1px), linear-gradient(to bottom, #3223BD 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white border-b-2 border-pale-purple shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-twilight hover:text-twilight/80 transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-nunito font-semibold">Return to Selection</span>
          </Link>
          <div className="text-right">
            <h1 className="text-xl font-carbona text-twilight">Corporate / Professional</h1>
            <p className="text-xs font-nunito text-design-black">Enterprise Capability Inventory</p>
          </div>
        </div>
      </div>

      {/* Scope Boundary */}
      <div className="absolute top-24 left-8 right-8 bottom-8 border-4 border-dashed border-pale-purple rounded-[40px] pointer-events-none z-0"></div>

      {/* Main Canvas */}
      <div className="relative w-full h-screen pt-20 px-12">
        
        {/* Cross-cutting Infrastructure */}
        <motion.div
          className="absolute top-32 left-1/2 -translate-x-1/2 w-[680px] z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-2 border-twilight/30 rounded-lg p-6 bg-white shadow-md">
            <h2 className="text-xl font-carbona text-twilight text-center mb-2">
              {architectureData.crossCuttingConcepts.label}
            </h2>
            <p className="text-xs font-nunito text-design-black/70 text-center mb-4">
              {architectureData.crossCuttingConcepts.description}
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs font-nunito text-design-black">
              {architectureData.crossCuttingConcepts.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-pale-purple/50 px-2 py-1.5 rounded border border-pale-purple">
                  <span className="w-1.5 h-1.5 rounded-full bg-twilight mt-1 flex-shrink-0"></span>
                  <span className="leading-tight">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Data Governance Region */}
        <motion.div
          className="absolute top-[320px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-2 border-twilight/30 rounded-lg p-5 bg-white shadow-md min-w-[380px]">
            <h3 className="text-center text-sm font-nunito font-bold text-design-black mb-3">Data Governance</h3>
            <div className="flex gap-3 justify-center">
              {getTasksByRegion("Data Governance").map((task) => (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                  className={`cursor-pointer p-4 w-[170px] h-[100px] bg-white border-l-4 rounded shadow-sm transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-lg scale-105' : 'border-pale-purple'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
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

        {/* Acquisition & Discovery */}
        <motion.div
          className="absolute top-[500px] left-[40px] z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-left max-w-[280px] bg-white p-5 rounded-lg shadow-md border-l-4 border-twilight">
            <h3 className="text-base font-nunito font-bold text-design-black mb-2">Acquisition & Discovery</h3>
            <p className="text-xs font-nunito text-design-black/70 leading-relaxed">
              {architectureData.visualRegions["Acquisition & Discovery"].description}
            </p>
          </div>
        </motion.div>

        {/* Insight & Action */}
        <motion.div
          className="absolute top-[570px] left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="border-2 border-twilight/30 rounded-lg p-5 bg-white shadow-md min-w-[420px]">
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
                  className={`cursor-pointer p-4 w-[190px] h-[100px] bg-white border-l-4 rounded shadow-sm transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-lg scale-105' : 'border-pale-purple'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
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

        {/* Data Atlas */}
        <motion.div
          className="absolute right-[40px] top-[350px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
                className={`cursor-pointer p-5 w-[180px] h-[130px] bg-white border-l-4 rounded shadow-sm transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-lg scale-105' : 'border-pale-purple'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
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

        {/* Research & Consulting */}
        <motion.div
          className="absolute top-[160px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="border-2 border-twilight/30 rounded-lg p-5 bg-white shadow-md min-w-[260px]">
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
                className={`cursor-pointer p-4 bg-white border-l-4 rounded shadow-sm transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-lg scale-105' : 'border-pale-purple'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-xs font-nunito font-semibold text-design-black/60 mb-1">{task.name}</div>
                  <div className="text-xs font-nunito font-bold text-design-black">{task.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance & Services */}
        <motion.div
          className="absolute top-[560px] right-[280px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="border-2 border-twilight/30 rounded-lg p-5 bg-white shadow-md min-w-[260px]">
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
                className={`cursor-pointer p-4 bg-white border-l-4 rounded shadow-sm transition-all duration-200 flex flex-col justify-center ${hoveredTask === task.id ? 'border-twilight shadow-lg scale-105' : 'border-pale-purple'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
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
            className="fixed inset-0 bg-design-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-10 max-w-3xl w-full shadow-2xl border-t-4 border-twilight"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-pale-purple">
                <div>
                  <div className="text-sm font-nunito font-semibold text-design-black/60 mb-1">{selectedTask.name}</div>
                  <h2 className="text-2xl font-carbona text-twilight">{selectedTask.title}</h2>
                  <div className="mt-2 text-sm font-nunito text-design-black/70">
                    Visual Region: <span className="font-bold text-design-black">{selectedTask.region}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 hover:bg-light-grey rounded transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-design-black" />
                </button>
              </div>

              <div className="bg-pale-purple/30 p-5 rounded-lg border-l-4 border-twilight">
                <p className="text-sm font-nunito text-design-black leading-relaxed">
                  This is a peer capability domain. All seven task areas have equal structural standing with no hierarchical relationships, ownership, or implied sequence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-pale-purple py-3 text-center text-xs font-nunito text-design-black/70 z-20">
        Enterprise Capability Architecture Framework
      </div>
    </div>
  );
}
