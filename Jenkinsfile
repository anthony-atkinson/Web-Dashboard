node('master') {
    dir('/var/docker/pi-web-interface') {
        stage('Checkout') {
            checkout scm
        }
        stage('Build') {
            sh 'docker build -t local-web-dashboard .'
        }
        stage('Deploy') {
            sh 'docker-compose down'
            sh 'docker-compose up -d'
        }
    }
}