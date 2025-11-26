pipeline {
agent any


environment {
REGISTRY = "my-docker-registry.example.com" // change if you push images
IMAGE_NAME = "react-jenkins-app"
}


stages {
stage('Checkout') {
steps {
checkout scm
}
}


stage('Install') {
steps {
sh 'npm ci'
}
}


stage('Build') {
steps {
sh 'npm run build'
}
post {
success {
archiveArtifacts artifacts: 'dist/**', fingerprint: true
}
}
}


stage('Unit Tests') {
steps {
// placeholder: add real tests here
sh 'npm run test || true'
}
}


stage('Build Docker') {
steps {
script {
sh "docker build -t ${env.IMAGE_NAME}:${env.BUILD_NUMBER} ."
}
}
}


stage('Push Docker (optional)') {
when {
expression { return false } // change to true and configure registry credentials to enable
}
steps {
withCredentials([string(credentialsId: 'DOCKER_REGISTRY_PASS', variable: 'REG_PASS')]) {
sh 'echo $REG_PASS | docker login my-docker-registry.example.com -u myuser --password-stdin'
sh "docker tag ${env.IMAGE_NAME}:${env.BUILD_NUMBER} ${env.REGISTRY}/${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
sh "docker push ${env.REGISTRY}/${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
}
}
}
}


post {
always {
junit allowEmptyResults: true, testResults: '**/test-results.xml'
cleanWs()
}
success {
echo "Build succeeded: ${env.BUILD_URL}"
}
failure {
echo "Build failed: ${env.BUILD_URL}"
}
}
}
