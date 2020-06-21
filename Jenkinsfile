node('master') {
    dir('/var/docker/pi-web-interface') {
        stage('Checkout') {
            checkout scm
        }
        stage('Deploy') {
            sh 'docker-compose down'
            sh 'docker-compose up -d'
        }
    }
}