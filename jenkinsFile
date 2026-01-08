pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    credentialsId: 'jenkins',
                    url: 'https://github.com/lstierney/recipe-website-frontend/'
                )
            }
        }

        stage('Build with npm') {
            steps {
                sh '''
                    npm install
                    npm run test
                    npm run build
                '''
            }
        }
    }
}
