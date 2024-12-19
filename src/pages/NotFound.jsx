import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Page non trouvée
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg
            hover:bg-primary-600 transition-colors duration-200"
        >
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
