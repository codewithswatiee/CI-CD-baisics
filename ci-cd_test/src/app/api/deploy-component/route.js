import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { componentType, componentName, componentCode, userInfo, customProps } = await request.json();

    // Validate required fields
    if (!componentType || !componentName || !componentCode || !userInfo?.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubOwner || !githubRepo) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create component file path
    const filePath = `ci-cd_test/src/components/user-generated/${componentName}.js`;
    const commitMessage = `Add user component: ${componentName} by ${userInfo.name}`;

    // Check if file already exists
    let sha = null;
    try {
      const existingFileResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      
      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json();
        sha = existingFile.sha;
      }
    } catch (error) {
      // File doesn't exist, which is fine for new components
    }

    // Encode component code to base64
    const content = Buffer.from(componentCode).toString('base64');

    // Create/update file via GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content,
          sha, // Include SHA if updating existing file
          committer: {
            name: userInfo.name,
            email: userInfo.email || 'anonymous@example.com',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      deploymentId: result.commit.sha,
      message: 'Component deployed successfully!',
      githubUrl: result.content.html_url,
    });

  } catch (error) {
    console.error('Deploy component error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
