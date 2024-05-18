# CI/CD Pipeline Configuration for Node.js Application

This document provides a step-by-step guide on configuring Jenkins to run test cases and set up a CI/CD pipeline for a Node.js application. The pipeline automates the build, test, and deployment processes, including staging and production deployments using Docker.

## Prerequisites

1. **Jenkins Installed**: Ensure Jenkins is installed and running.
2. **GitHub Repository**: Your application source code is hosted on GitHub.
3. **Docker Installed**: Ensure Docker is installed on the Jenkins server.
4. **Jenkins Plugins**:
   - Git Plugin
   - Docker Pipeline Plugin
   - SSH Agent Plugin (for SSH credentials management)
   - Blue Ocean (optional, for a better UI)

## Jenkins Configuration Steps

### 1. Install Necessary Jenkins Plugins

- Go to **Manage Jenkins** > **Manage Plugins**.
- Install the following plugins:
  - Git Plugin
  - Docker Pipeline Plugin
  - SSH Agent Plugin
  - Blue Ocean (optional)

### 2. Create a New Jenkins Pipeline Job

1. Go to the Jenkins dashboard.
2. Click on **New Item**.
3. Enter a name for your job, select **Pipeline**, and click **OK**.

### 3. Configure Source Code Management (SCM)

1. Under the **Pipeline** section, click on **Pipeline script**.
2. Set the **Definition** to **Pipeline script from SCM**.
3. Select **Git** and provide your repository URL.
4. If your repository is private, add credentials by clicking on **Add** and selecting the appropriate credential type.

### 4. Set Up the Jenkinsfile

Create a `Jenkinsfile` in the root of your repository if it doesn’t exist. This file will contain the pipeline script defining the build, test, and deployment stages.

### 5. Configure Docker and Docker Compose

1. Create separate `docker-compose` files for staging and production environments in the root of your repository.
2. These files will define how to deploy your application in different environments.

### 6. Configure Credentials in Jenkins

1. Go to **Manage Jenkins** > **Manage Credentials** > **(global)** > **Add Credentials**.
2. Add Docker Hub credentials.
3. Add SSH credentials for staging and production servers.

### 7. Define the Jenkins Pipeline

Create a `Jenkinsfile` that defines the pipeline stages for checking out the code, installing dependencies, running tests, verifying the Dockerfile, building the Docker image, pushing the Docker image to the registry, and deploying to staging and production environments.

### 8. Test and Trigger Builds

1. **Manual Build**:
   - Go to the Jenkins job and click **Build Now** to run the pipeline manually.
2. **Automated Build**:
   - Make a change in your GitHub repository and push it.
   - Verify that the Jenkins pipeline is triggered by the commit.
   - Check the Jenkins console output to ensure each stage is executed correctly.

### 9. Verify Deployment

- Access your application on the staging environment.
- Access your application on the production environment.

## Conclusion

This guide helps you set up a Jenkins CI/CD pipeline for a Node.js application. The pipeline automates the processes of building, testing, and deploying the application to staging and production environments using Docker. By following these steps, you ensure a robust and automated deployment process, improving the efficiency and reliability of your development workflow.
