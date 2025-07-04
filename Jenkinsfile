pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = 'e2bbfaec-5d17-4ee6-8720-f88b4afa8aaf'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
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
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'echo Running tests...'
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    echo "Deploying to production. Site ID: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status --auth=$NETLIFY_AUTH_TOKEN
                    node_modules/.bin/netlify deploy \
                        --dir=dist \
                        --prod \
                        --auth=$NETLIFY_AUTH_TOKEN \
                        --site=$NETLIFY_SITE_ID \
                        --no-build
                '''
            }
        }
    }
}
