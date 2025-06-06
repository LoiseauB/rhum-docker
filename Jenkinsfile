pipeline {
    agent any

    environment {
        ImageRegistry = 'baptl08'
        EC2_IP = '13.60.33.134'
        DockerComposeFile = 'docker-compose.yaml'
        DotEnvFile = '.env'
    }

    stages {

        stage("buildPushImage") {
            steps {
                script {
                    echo "Building and Pushing Image to DockerHub..."
                    withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker buildx build --platform linux/amd64 -t ${ImageRegistry}/rhum-back:${BUILD_NUMBER} ./rhum-back --push"
                        sh "docker buildx build --platform linux/amd64 -t ${ImageRegistry}/rhum-app:${BUILD_NUMBER} ./rhum-app --push"
                    }
                }
            }
        }

        stage("deployCompose") {
            steps {
                script {
                    echo "Deploying with Docker Compose..."
                    sshagent(credentials: ['ec2']) {
                        // Upload files once to reduce redundant SCP commands
                        sh '''
                        scp -o StrictHostKeyChecking=no ${DockerComposeFile} ubuntu@${EC2_IP}:/home/ubuntu
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "docker compose down"
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "docker compose up -d"
                        '''
                    }
                }
            }
        }
    }
}
