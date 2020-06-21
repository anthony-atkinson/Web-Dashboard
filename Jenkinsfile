node('master') {
    dir('/var/share/backgrounds') {
        stage('Checkout') {
            scm checkout
        }
        stage('Deploy') {
            sh 'docker-compose down'
            sh 'docker-compose up -d'
        }
    }
}