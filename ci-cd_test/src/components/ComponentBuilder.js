'use client';

import { useState } from 'react';

const PREDEFINED_COMPONENTS = {
  'hero-section': {
    name: 'Hero Section',
    preview: '🌟 Hero Banner',
    template: `export default function HeroSection({ title = "Welcome", subtitle = "Your subtitle here" }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl opacity-90">{subtitle}</p>
      </div>
    </div>
  );
}`
  },
  'feature-card': {
    name: 'Feature Card',
    preview: '📋 Feature Display',
    template: `export default function FeatureCard({ icon = "⭐", title = "Feature", description = "Description here" }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}`
  },
  'call-to-action': {
    name: 'Call to Action',
    preview: '🚀 Action Button',
    template: `export default function CallToAction({ 
  title = "Ready to get started?", 
  buttonText = "Get Started",
  buttonLink = "#"
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>
        <a 
          href={buttonLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}`
  }
};

export default function ComponentBuilder() {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [componentName, setComponentName] = useState('');
  const [customProps, setCustomProps] = useState({});
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const handleComponentSelect = (componentKey) => {
    setSelectedComponent(componentKey);
    setComponentName(componentKey + '-' + Date.now());
  };

  const generateComponentCode = () => {
    if (!selectedComponent) return '';
    
    let template = PREDEFINED_COMPONENTS[selectedComponent].template;
    
    // Replace default props with custom ones
    Object.entries(customProps).forEach(([key, value]) => {
      const defaultRegex = new RegExp(`${key} = "[^"]*"`, 'g');
      template = template.replace(defaultRegex, `${key} = "${value}"`);
    });
    
    return template;
  };

  const handleDeploy = async () => {
    if (!selectedComponent || !componentName || !userInfo.name) {
      alert('Please fill in all required fields');
      return;
    }

    setIsDeploying(true);
    setDeployStatus('🔄 Initializing deployment...');

    try {
      // Production-ready: Call backend API endpoint
      const response = await fetch('/api/deploy-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentType: selectedComponent,
          componentName,
          componentCode: generateComponentCode(),
          userInfo,
          customProps
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setDeployStatus('✅ Component deployed successfully!');
      setDeployStatus(prev => prev + ` Deployment ID: ${result.deploymentId || 'N/A'}`);
      
      // Reset form
      setSelectedComponent('');
      setComponentName('');
      setCustomProps({});
      setUserInfo({ name: '', email: '' });
      
    } catch (error) {
      console.error('Deployment error:', error);
      setDeployStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Live Component Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create custom components that get automatically deployed to the live website via CI/CD pipeline
          </p>
        </div>
        
        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={userInfo.name}
              onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userInfo.email}
              onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Component Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Select Component Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(PREDEFINED_COMPONENTS).map(([key, component]) => (
              <button
                key={key}
                onClick={() => handleComponentSelect(key)}
                className={`p-6 border-2 rounded-xl transition-all duration-200 text-left ${
                  selectedComponent === key 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 transform scale-105' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-3">{component.preview}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{component.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to customize</p>
              </button>
            ))}
          </div>
        </div>

        {/* Component Customization */}
        {selectedComponent && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Customize Component</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Component Name</label>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter component name"
              />
            </div>

            {/* Dynamic prop inputs */}
            {selectedComponent === 'hero-section' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={customProps.title || ''}
                    onChange={(e) => setCustomProps(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Hero title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subtitle</label>
                  <input
                    type="text"
                    value={customProps.subtitle || ''}
                    onChange={(e) => setCustomProps(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Hero subtitle"
                  />
                </div>
              </div>
            )}

            {selectedComponent === 'feature-card' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={customProps.icon || ''}
                    onChange={(e) => setCustomProps(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="🚀"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={customProps.title || ''}
                    onChange={(e) => setCustomProps(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Feature title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    value={customProps.description || ''}
                    onChange={(e) => setCustomProps(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Feature description"
                    rows="3"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Code Preview */}
        {selectedComponent && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Generated Code Preview</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border">
              <code className="text-gray-800 dark:text-gray-200">{generateComponentCode()}</code>
            </pre>
          </div>
        )}

        {/* Deploy Button */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <button
            onClick={handleDeploy}
            disabled={isDeploying || !selectedComponent || !componentName || !userInfo.name}
            className={`px-12 py-4 rounded-xl font-semibold text-white transition-all duration-200 text-lg ${
              isDeploying || !selectedComponent || !componentName || !userInfo.name
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isDeploying ? '🚀 Deploying...' : '🚀 Deploy Component to Live Site'}
          </button>
          
          {deployStatus && (
            <div className={`mt-6 p-4 rounded-lg ${
              deployStatus.includes('✅') 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                : deployStatus.includes('❌') 
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
            }`}>
              <p className={`font-medium ${
                deployStatus.includes('✅') 
                  ? 'text-green-800 dark:text-green-300' 
                  : deployStatus.includes('❌') 
                  ? 'text-red-800 dark:text-red-300'
                  : 'text-blue-800 dark:text-blue-300'
              }`}>
                {deployStatus}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
