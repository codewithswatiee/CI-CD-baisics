'use client';

import { useState } from 'react';
import { GitHubService } from '../lib/github';

const PREDEFINED_COMPONENTS = {
  'hero-section': {
    name: 'Hero Section',
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
    template: `export default function FeatureCard({ icon = "⭐", title = "Feature", description = "Description here" }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}`
  },
  'call-to-action': {
    name: 'Call to Action',
    template: `export default function CallToAction({ 
  title = "Ready to get started?", 
  buttonText = "Get Started",
  buttonLink = "#"
}) {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <a 
          href={buttonLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
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
    setDeployStatus('Creating component...');

    try {
      // For demo purposes - simulate the process without actually committing
      // In production, you'd need GitHub OAuth or a backend API
      
      setDeployStatus('Generating component code...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDeployStatus('Simulating GitHub commit...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDeployStatus('Triggering CI/CD pipeline...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDeployStatus('✅ Component would be deployed successfully!');
      setDeployStatus(prev => prev + ' (This is a demo - no actual deployment occurred)');
      
      // Reset form
      setSelectedComponent('');
      setComponentName('');
      setCustomProps({});
      
    } catch (error) {
      console.error('Deployment error:', error);
      setDeployStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Live Component Builder</h2>
      
      {/* User Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Component Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Select Component Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(PREDEFINED_COMPONENTS).map(([key, component]) => (
            <button
              key={key}
              onClick={() => handleComponentSelect(key)}
              className={`p-4 border-2 rounded-lg transition-colors ${
                selectedComponent === key 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
              }`}
            >
              <h4 className="font-semibold">{component.name}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Component Customization */}
      {selectedComponent && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Customize Component</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Component Name</label>
            <input
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
              placeholder="Enter component name"
            />
          </div>

          {/* Dynamic prop inputs based on selected component */}
          {selectedComponent === 'hero-section' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={customProps.title || ''}
                  onChange={(e) => setCustomProps(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
                  placeholder="Hero title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={customProps.subtitle || ''}
                  onChange={(e) => setCustomProps(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
                  placeholder="Hero subtitle"
                />
              </div>
            </>
          )}

          {selectedComponent === 'feature-card' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  value={customProps.icon || ''}
                  onChange={(e) => setCustomProps(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
                  placeholder="🚀"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={customProps.title || ''}
                  onChange={(e) => setCustomProps(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
                  placeholder="Feature title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={customProps.description || ''}
                  onChange={(e) => setCustomProps(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700"
                  placeholder="Feature description"
                  rows="3"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Code Preview */}
      {selectedComponent && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Generated Code</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{generateComponentCode()}</code>
          </pre>
        </div>
      )}

      {/* Deploy Button */}
      <div className="text-center">
        <button
          onClick={handleDeploy}
          disabled={isDeploying || !selectedComponent || !componentName || !userInfo.name}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
            isDeploying || !selectedComponent || !componentName || !userInfo.name
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isDeploying ? 'Deploying...' : 'Deploy Component to Live Site'}
        </button>
        
        {deployStatus && (
          <p className={`mt-4 font-medium ${
            deployStatus.includes('✅') 
              ? 'text-green-600' 
              : deployStatus.includes('❌') 
              ? 'text-red-600' 
              : 'text-blue-600'
          }`}>
            {deployStatus}
          </p>
        )}
      </div>
    </div>
  );
}
