pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            reuseNode true
        }
    }

    environment {
        NETLIFY_SITE_ID = 'e2bbfaec-5d17-4ee6-8720-f88b4afa8aaf'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'echo Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    echo "Deploying to production. Site ID: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                    node_modules/.bin/netlify deploy --dir=dist --prod --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
                '''
            }
        }
    }
}
