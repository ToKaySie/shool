import { motion } from 'framer-motion'

const subjects = [
  { id: 'math', name: 'Mathématiques', icon: '📐' },
  { id: 'physics', name: 'Physique', icon: '⚡' },
  { id: 'chemistry', name: 'Chimie', icon: '🧪' },
  { id: 'biology', name: 'Biologie', icon: '🧬' },
  { id: 'history', name: 'Histoire', icon: '📚' },
  { id: 'geography', name: 'Géographie', icon: '🌍' },
  { id: 'literature', name: 'Littérature', icon: '📖' },
  { id: 'languages', name: 'Langues', icon: '🗣' },
]

function SubjectSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {subjects.map((subject, index) => (
        <motion.button
          key={subject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(subject.id)}
          className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg
            hover:shadow-xl transition-all duration-200 text-center"
        >
          <span className="text-4xl mb-2 block">{subject.icon}</span>
          <span className="font-medium">{subject.name}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default SubjectSelector
