pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout source code from Git repository
                git 'https://github.com/alanturrr-1703/Demo.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies using npm
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Run tests using Jest
                sh 'npm test'
            }
        }
    }
    
    post {
        success {
            // If the build succeeds, print success message
            echo 'CI pipeline succeeded!'
        }
        failure {
            // If the build fails, print failure message
            echo 'CI pipeline failed!'
        }
    }
}
