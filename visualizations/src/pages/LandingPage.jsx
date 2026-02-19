import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const styles = [
  {
    id: 'modern',
    title: 'Modern / Minimalist',
    description: 'Clean lines, subtle colors, refined presentation',
    gradient: 'from-pale-purple to-light-grey',
    borderColor: 'border-twilight',
    textColor: 'text-twilight'
  },
  {
    id: 'vibrant',
    title: 'Vibrant / Bold',
    description: 'High energy colors, dynamic presentation',
    gradient: 'from-purple-pop via-persimmon-pop to-teal-pop',
    borderColor: 'border-persimmon-pop',
    textColor: 'text-white'
  },
  {
    id: 'corporate',
    title: 'Corporate / Professional',
    description: 'Enterprise structure, formal presentation',
    gradient: 'from-pale-purple to-white',
    borderColor: 'border-twilight',
    textColor: 'text-twilight'
  },
  {
    id: 'tech',
    title: 'Tech / Futuristic',
    description: 'Dark theme, technical aesthetics',
    gradient: 'from-design-black to-twilight',
    borderColor: 'border-twilight',
    textColor: 'text-twilight',
    isDark: true
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-light-grey">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-carbona text-twilight mb-4">
            Unified Data Fabric
          </h1>
          <p className="text-xl font-nunito text-design-black font-semibold mb-2">
            Capability Inventory Visualization
          </p>
          <p className="text-base font-nunito text-design-black/70 max-w-2xl mx-auto">
            The connective backbone that unifies and governs data across the enterprise.
            Select a visual style below to explore the capability inventory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/${style.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-br ${style.gradient} rounded-2xl p-8 shadow-lg border-2 ${style.borderColor} hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                >
                  <div className="mb-6">
                    <h2 className={`text-2xl font-carbona ${style.isDark ? 'text-white' : 'text-twilight'} mb-3`}>
                      {style.title}
                    </h2>
                    <p className={`font-nunito ${style.isDark ? 'text-white/90' : 'text-design-black/80'} text-sm`}>
                      {style.description}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <span className={`inline-flex items-center px-5 py-2 rounded-lg bg-white border-2 ${style.borderColor} font-nunito font-bold text-sm ${style.textColor} group-hover:scale-110 transition-transform`}>
                      View
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 font-nunito text-design-black/60 text-sm"
        >
          <p>
            Interactive capability visualization • Built with React, Framer Motion, and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </div>
  );
}
