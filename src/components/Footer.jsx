function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-lg mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ScholarGPT. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
