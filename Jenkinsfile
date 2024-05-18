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

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t demo-app .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-credentials', variable: 'DOCKERHUB_PASSWORD')]) {
                    bat 'echo %DOCKERHUB_PASSWORD% | docker login -u your-dockerhub-username --password-stdin'
                    bat 'docker tag demo-app your-dockerhub-username/demo-app'
                    bat 'docker push your-dockerhub-username/demo-app'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'staging-server-ssh', keyFileVariable: 'KEYFILE')]) {
                    bat '''
                        docker pull your-dockerhub-username/demo-app
                        ssh -i %KEYFILE% user@staging-server "docker run -d -p 80:80 your-dockerhub-username/demo-app"
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                withCredentials([sshUserPrivateKey(credentialsId: 'production-server-ssh', keyFileVariable: 'KEYFILE')]) {
                    bat '''
                        docker pull your-dockerhub-username/demo-app
                        ssh -i %KEYFILE% user@production-server "docker run -d -p 80:80 your-dockerhub-username/demo-app"
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