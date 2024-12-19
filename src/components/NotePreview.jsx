import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'

function NotePreview({ data }) {
  const [loading, setLoading] = useState(false)

  const handleExportPDF = async () => {
    setLoading(true)
    try {
      const { default: html2pdf } = await import('html2pdf.js')
      const element = document.getElementById('note-content')
      const opt = {
        margin: [15, 15],
        filename: `${data.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('Erreur export PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportMarkdown = () => {
    const blob = new Blob([data.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.title.toLowerCase().replace(/\s+/g, '-')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{data.title}</h2>
        <div className="flex flex-wrap gap-4 text-white/90 text-sm">
          <span>Matière: {data.subject}</span>
          <span>Niveau: {data.level}</span>
          <span>Créé le: {new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="border-b dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex justify-end gap-3">
          <button
            onClick={handleExportPDF}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            {loading ? 'Export...' : 'PDF'}
          </button>
          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-2 px-4 py-2 border border-blue-600
              text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg
              hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <DocumentDuplicateIcon className="w-5 h-5" />
            Markdown
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-auto">
        <div id="note-content" className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )
}

export default NotePreview
