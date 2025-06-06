pipeline {
    agent any

    environment {
        ImageRegistry = 'baptl08'
        EC2_IP = '13.61.23.149'
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
                        sh "docker buildx build --platform linux/amd64 -t ${ImageRegistry}/rhum-back ./rhum-back --push"
                        sh "docker buildx build --platform linux/amd64 -t ${ImageRegistry}/rhum-app ./rhum-app --push"
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
                        scp -o StrictHostKeyChecking=no ${DockerComposeFile} ec2-user@${EC2_IP}:/home/ec2-user
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} "docker-compose down"
                        ssh -o StrictHostKeyChecking=no ec2-user@${EC2_IP} "docker-compose up -d"
                        '''
                    }
                }
            }
        }
    }
}
