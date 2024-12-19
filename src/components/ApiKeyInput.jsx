import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { KeyIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { setApiKey, setKeyValidity, clearApiKey } from '../store/apiKeySlice'
import { generateNote } from '../services/gemini'

function ApiKeyInput() {
  const dispatch = useDispatch()
  const { key, isValid } = useSelector((state) => state.apiKey)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState('')

  const validateApiKey = async (newKey) => {
    setIsChecking(true)
    setError('')

    try {
      // Test simple avec l'API
      await generateNote({
        subject: 'Test',
        level: 'test',
        topic: 'API validation test',
      })
      
      dispatch(setKeyValidity(true))
      setError('')
    } catch (err) {
      dispatch(setKeyValidity(false))
      setError('Clé API invalide')
      console.error('Erreur de validation:', err)
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newKey = formData.get('apiKey')
    
    if (newKey && newKey !== key) {
      dispatch(setApiKey(newKey))
      await validateApiKey(newKey)
    }
  }

  const handleClear = () => {
    dispatch(clearApiKey())
    setError('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <KeyIcon className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Configuration de l'API Gemini</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="password"
              name="apiKey"
              placeholder="Entrez votre clé API Gemini"
              defaultValue={key}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 
                dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isChecking}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isChecking ? 'Vérification...' : 'Valider'}
            </button>
            {key && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-sm">
          {isValid ? (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircleIcon className="w-5 h-5" />
              <span>Clé API valide</span>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 text-red-500">
              <XCircleIcon className="w-5 h-5" />
              <span>{error}</span>
            </div>
          ) : null}
        </div>
      </form>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Pour obtenir une clé API Gemini, visitez{' '}
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Google AI Studio
          </a>
        </p>
      </div>
    </motion.div>
  )
}

export default ApiKeyInput
