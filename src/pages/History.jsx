import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

function History() {
  const notes = useSelector((state) => state.notes.items) || []

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Historique des fiches
      </motion.h1>

      {notes.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Aucune fiche n'a encore été créée.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {note.subject} - {note.level}
              </p>
              <div className="mt-2 flex justify-end space-x-2">
                <button className="text-primary-500 hover:text-primary-600">
                  Voir
                </button>
                <button className="text-primary-500 hover:text-primary-600">
                  Exporter
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
