export default function Home() {
  const ciSteps = [
    { step: "1", title: "Code Commit", description: "Developer pushes code to repository" },
    { step: "2", title: "Build Trigger", description: "CI pipeline automatically starts" },
    { step: "3", title: "Testing", description: "Automated tests run to verify code quality" },
    { step: "4", title: "Build", description: "Application is compiled and built" },
    { step: "5", title: "Deploy", description: "Code is deployed to staging/production" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            CI/CD Pipeline Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
            Continuous Integration & Continuous Deployment Showcase
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to CI/CD Basics
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This project demonstrates a simple CI/CD pipeline using modern development practices.
            Every code change triggers automated testing, building, and deployment processes.
          </p>
        </div>

        {/* CI/CD Pipeline Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            CI/CD Pipeline Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {ciSteps.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🚀 Automated Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every push to the main branch triggers an automated deployment pipeline.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🧪 Quality Assurance
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automated testing ensures code quality and prevents bugs from reaching production.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              ⚡ Fast Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get immediate feedback on code changes with quick build and test cycles.
            </p>
          </div>
        </div>

        {/* Current Build Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Build Status
          </h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">Build Passing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">Tests Passing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-blue-600 dark:text-blue-400 font-medium">Deployed</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Built with Next.js | Demonstrating CI/CD Pipeline Concepts
          </p>
        </div>
      </footer>
    </div>
  );
}
