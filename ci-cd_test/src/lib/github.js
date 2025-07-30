// GitHub API service for committing user-generated components

export class GitHubService {
  constructor(token) {
    this.token = token;
    this.owner = 'codewithswatiee';
    this.repo = 'CI-CD-baisics';
    this.baseUrl = 'https://api.github.com';
  }

  async createComponent(componentName, componentCode, userInfo) {
    const path = `ci-cd_test/src/components/user-generated/${componentName}.js`;
    const message = `Add user component: ${componentName} by ${userInfo.name}`;

    try {
      // Get current file (if exists) to get SHA
      let sha = null;
      try {
        const existingFile = await this.getFile(path);
        sha = existingFile.sha;
      } catch (error) {
        // File doesn't exist, that's fine for new components
      }

      const content = Buffer.from(componentCode).toString('base64');

      const response = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message,
          content,
          sha, // Include SHA if updating existing file
          committer: {
            name: userInfo.name || 'Anonymous User',
            email: userInfo.email || 'anonymous@example.com'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating component:', error);
      throw error;
    }
  }

  async getFile(path) {
    const response = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}`, {
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      throw new Error(`File not found: ${path}`);
    }

    return await response.json();
  }

  async listUserComponents() {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/ci-cd_test/src/components/user-generated`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });

      if (!response.ok) {
        return []; // Directory doesn't exist yet
      }

      const files = await response.json();
      return files.filter(file => file.name.endsWith('.js'));
    } catch (error) {
      console.error('Error listing components:', error);
      return [];
    }
  }
}
