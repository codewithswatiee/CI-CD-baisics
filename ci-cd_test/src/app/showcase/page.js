'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

export default function ShowcasePage() {
  const [userComponents, setUserComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserComponents();
  }, []);

  const loadUserComponents = async () => {
    try {
      // In a real implementation, you'd fetch the list of user components
      // For now, we'll simulate some components
      const mockComponents = [
        { name: 'hero-section-1643123456', displayName: 'Custom Hero by John' },
        { name: 'feature-card-1643123789', displayName: 'Feature Card by Sarah' },
        { name: 'call-to-action-1643124000', displayName: 'CTA by Mike' }
      ];
      
      setUserComponents(mockComponents);
    } catch (error) {
      console.error('Error loading user components:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderUserComponent = (componentName) => {
    try {
      // Dynamically import user-generated components
      const UserComponent = dynamic(
        () => import(`../components/user-generated/${componentName}`),
        { 
          loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>,
          ssr: false 
        }
      );
      return <UserComponent />;
    } catch (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading component: {componentName}</p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            User-Generated Components Showcase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Components created by the community and deployed via CI/CD
          </p>
        </header>

        {userComponents.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-12 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Components Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Be the first to create a component using our live builder!
            </p>
            <a 
              href="/builder" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Create Component
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {userComponents.map((component, index) => (
              <div key={component.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3 border-b">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {component.displayName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Component ID: {component.name}
                  </p>
                </div>
                <div className="p-6">
                  {renderUserComponent(component.name)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="/builder" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Add Your Component
          </a>
        </div>
      </div>
    </div>
  );
}
