pipeline {
    agent any
    triggers {
        pollSCM('*/5 * * * *')
    }

    environment {
        DOCKER_IMAGE = 'alanturrr1703/demo-app'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
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
                bat "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        bat "docker tag ${DOCKER_IMAGE}:${env.BUILD_ID} ${DOCKER_IMAGE}:latest"
                        bat "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
                        bat "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    dir('./') {
                        // Ensure to stop any running container for staging before deploying
                        bat """
                            docker-compose -f docker-compose.staging.yml down || true
                            docker-compose -f docker-compose.staging.yml up -d
                        """
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                script {
                    dir('./') {
                        // Ensure to stop any running container for production before deploying
                        bat """
                            docker-compose -f docker-compose.production.yml down || true
                            docker-compose -f docker-compose.production.yml up -d
                        """
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
