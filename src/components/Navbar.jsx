import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

function Navbar() {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">ScholarGPT</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/generator" className="hover:text-primary-500">
              Générateur
            </Link>
            <Link to="/history" className="hover:text-primary-500">
              Historique
            </Link>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
