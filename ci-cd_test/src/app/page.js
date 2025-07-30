export default function Home() {
  const ciSteps = [
    { step: "1", title: "Code Commit", description: "Developer pushes code to repository", icon: "📝" },
    { step: "2", title: "Build Trigger", description: "CI pipeline automatically starts", icon: "🚀" },
    { step: "3", title: "Testing", description: "Automated tests run to verify code quality", icon: "🧪" },
    { step: "4", title: "Build", description: "Application is compiled and built", icon: "⚙️" },
    { step: "5", title: "Deploy", description: "Code is deployed to staging/production", icon: "🌐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              CI/CD Pipeline Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Continuous Integration & Continuous Deployment Showcase with Live Component Builder
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/builder"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Try Component Builder
              </a>
              <a
                href="/showcase"
                className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-all duration-200"
              >
                👀 View Showcase
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">🎯</span>
            Production-Ready CI/CD Pipeline
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Build. Test. Deploy. Automatically.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This project demonstrates a complete CI/CD pipeline where users can create components 
            through a web interface that automatically commits to GitHub and deploys via Vercel.
          </p>
        </div>

        {/* CI/CD Pipeline Steps */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {ciSteps.map((item, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < ciSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 z-0"></div>
                )}
                
                <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                      {item.step}
                    </div>
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Automated Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Every component creation triggers an automated deployment pipeline through GitHub Actions and Vercel.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quality Assurance
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Automated linting and testing ensures code quality and prevents bugs from reaching production.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Real-time Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Get immediate feedback on component creation with quick build and deployment cycles.
            </p>
          </div>
        </div>

        {/* Current Build Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Current System Status
            </h3>
            <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-600 dark:text-green-400 font-medium">Build Passing</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-600 dark:text-green-400 font-medium">Tests Passing</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Deployed</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">Last Deploy:</p>
              <p className="font-mono text-blue-600 dark:text-blue-400 font-semibold">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">Active Branch:</p>
              <p className="font-mono text-green-600 dark:text-green-400 font-semibold">main</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">Environment:</p>
              <p className="font-mono text-purple-600 dark:text-purple-400 font-semibold">production</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Next.js</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">GitHub Actions</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Vercel</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Tailwind CSS</span>
              <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">GitHub API</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Built with ❤️ for demonstrating CI/CD Pipeline Concepts
          </p>
        </div>
      </footer>
    </div>
  );
}
