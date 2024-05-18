pipeline {
    agent any
    triggers {
        pollSCM('*/5 * * * *')
    }

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

        stage('Verify Dockerfile') {
            steps {
                script {
                    if (!fileExists('Dockerfile')) {
                        error("Dockerfile not found in the workspace.")
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t alanturrr1703/demo-app .'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        bat 'docker tag alanturrr1703/demo-app alanturrr1703/demo-app'
                        bat 'docker push alanturrr1703/demo-app'
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                {   
                    script {
                    // Navigate to the directory containing docker-compose.yml
                        dir('./') {
                        // Run Docker Compose with production environment file
                        sh 'docker-compose -f docker-compose.yml up'
                        }

                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    // Navigate to the directory containing docker-compose.yml
                    dir('./') {
                        // Run Docker Compose with production environment file
                        sh 'docker-compose -f docker-compose.yml up'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'CI/CD pipeline succeeded!'
        }
        failure {
            echo 'CI/CD pipeline failed!'
        }
    }
}