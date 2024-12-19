import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateNote } from '../services/gemini'
import { useDispatch } from 'react-redux'
import { addNote } from '../store/notesSlice'

function NoteForm({ subject, onSubmit }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = {
      title: e.target.title.value,
      subject,
      topic: e.target.topic.value,
      level: e.target.level.value,
      includeGraphics: e.target.includeGraphics.checked,
      includeTables: e.target.includeTables.checked,
      includeExamples: e.target.includeExamples.checked,
    }

    try {
      const content = await generateNote(formData)
      const noteData = {
        ...formData,
        content,
        createdAt: new Date().toISOString(),
      }
      
      dispatch(addNote(noteData))
      onSubmit(noteData)
    } catch (err) {
      setError(err.message)
      console.error('Erreur de génération:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Titre de la fiche
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: Les équations du second degré"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="topic">
          Description détaillée du sujet
        </label>
        <textarea
          id="topic"
          name="topic"
          required
          rows="4"
          className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Décrivez le sujet que vous souhaitez aborder..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="level">
          Niveau
        </label>
        <select
          id="level"
          name="level"
          className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="college">Collège</option>
          <option value="lycee">Lycée</option>
          <option value="superieur">Supérieur</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="includeGraphics"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Inclure des descriptions de graphiques</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="includeTables"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Inclure des tableaux</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="includeExamples"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Inclure des exemples pratiques</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Génération en cours...
          </>
        ) : (
          'Générer la fiche'
        )}
      </button>

      {loading && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          L'IA génère votre fiche, cela peut prendre quelques secondes...
        </div>
      )}
    </motion.form>
  )
}

export default NoteForm
