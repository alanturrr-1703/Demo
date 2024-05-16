pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/alanturrr-1703/Demo.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
    }
    
    post {
        success {
            
            echo 'CI pipeline succeeded!'
        }
        failure {
            
            echo 'CI pipeline failed!'
        }
    }
}
