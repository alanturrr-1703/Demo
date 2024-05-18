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
                withCredentials([string(credentialsId: 'dockerhub-credentials', variable: 'DOCKERHUB_PASSWORD')]) {
                    bat 'echo %DOCKERHUB_PASSWORD% | docker login -u alanturrr1703 --Harshit@1703'
                    bat 'docker tag alanturrr1703/demo-app alanturrr1703/demo-app'
                    bat 'docker push alanturrr1703/demo-app'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'staging-server-ssh', keyFileVariable: 'KEYFILE')]) {
                    bat '''
                        docker pull alanturrr1703/demo-app
                        ssh -i %KEYFILE% user@staging-server "docker run -d -p 80:80 alanturrr1703/demo-app"
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'production-server-ssh', keyFileVariable: 'KEYFILE')]) {
                    bat '''
                        docker pull alanturrr1703/demo-app
                        ssh -i %KEYFILE% user@production-server "docker run -d -p 80:80 alanturrr1703/demo-app"
                    '''
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