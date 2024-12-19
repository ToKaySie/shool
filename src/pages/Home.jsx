import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6 gradient-text">
          Bienvenue sur ScholarGPT
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Créez des fiches de révision intelligentes et personnalisées grâce à l'IA
        </p>
        <Link
          to="/generator"
          className="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg
            hover:bg-primary-600 transition-colors duration-200"
        >
          Commencer maintenant
        </Link>
      </motion.div>
    </div>
  )
}

export default Home
