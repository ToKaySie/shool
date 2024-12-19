import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
