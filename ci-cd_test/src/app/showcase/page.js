'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import placeholder component
const PlaceholderComponent = dynamic(() => import('../../components/user-generated/placeholder'), {
  ssr: false
});

export default function ShowcasePage() {
  const [userComponents, setUserComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserComponents();
  }, []);

  const loadUserComponents = async () => {
    try {
      // Try to fetch user components from API
      const response = await fetch('/api/user-components');
      if (response.ok) {
        const components = await response.json();
        setUserComponents(components);
      } else {
        // Fallback to empty array if API not available
        setUserComponents([]);
      }
    } catch (error) {
      console.log('No user components available yet');
      setUserComponents([]);
    } finally {
      setLoading(false);
    }
  };

  const renderUserComponent = (componentName) => {
    try {
      // Dynamically import user-generated components
      const UserComponent = dynamic(
        () => import(`../../components/user-generated/${componentName}`).catch(() => 
          import('../../components/user-generated/placeholder')
        ),
        { 
          loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>,
          ssr: false 
        }
      );
      return <UserComponent />;
    } catch (error) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">Error loading component: {componentName}</p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading showcase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Component Showcase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Components created by users and deployed automatically via CI/CD pipeline
          </p>
          <div className="mt-6">
            <a 
              href="/builder" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🚀 Create Your Component
            </a>
          </div>
        </header>

        {userComponents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No User Components Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be the first to create a component using our live builder!
              </p>
            </div>
            
            {/* Show placeholder component */}
            <PlaceholderComponent />
            
            <div className="text-center mt-8">
              <a 
                href="/builder" 
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                🎨 Start Building
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {userComponents.map((component, index) => (
              <div key={component.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {component.displayName || `Component ${index + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Component ID: {component.name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {component.createdAt || 'Unknown'}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {renderUserComponent(component.name)}
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <a 
                href="/builder" 
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ➕ Add Another Component
              </a>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-700">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-blue-800 dark:text-blue-200">
                <div className="text-2xl mb-2">🎨</div>
                <strong>1. Create</strong><br />
                Use the builder to design your component
              </div>
              <div className="text-blue-800 dark:text-blue-200">
                <div className="text-2xl mb-2">🚀</div>
                <strong>2. Deploy</strong><br />
                Automatically commits to GitHub
              </div>
              <div className="text-blue-800 dark:text-blue-200">
                <div className="text-2xl mb-2">🌐</div>
                <strong>3. Live</strong><br />
                Appears here instantly via CI/CD
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
