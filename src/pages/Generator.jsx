import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import SubjectSelector from '../components/SubjectSelector'
import NoteForm from '../components/NoteForm'
import NotePreview from '../components/NotePreview'
import ApiKeyInput from '../components/ApiKeyInput'

function Generator() {
  const [subject, setSubject] = useState('')
  const [noteData, setNoteData] = useState(null)
  const apiKey = useSelector((state) => state.apiKey)

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Générateur de fiches
      </motion.h1>

      <ApiKeyInput />

      {apiKey.isValid ? (
        !subject ? (
          <SubjectSelector onSelect={setSubject} />
        ) : !noteData ? (
          <NoteForm subject={subject} onSubmit={setNoteData} />
        ) : (
          <NotePreview data={noteData} />
        )
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Veuillez configurer votre clé API pour commencer
        </div>
      )}
    </div>
  )
}

export default Generator
