pipeline {
    agent any
    stages {
        stage('Metrics 1 - Ci') {
            steps {
                sh 'git log -n 1 --pretty=format:"%an made a commit: %h"'
            }
        }
        stage('Install Node.js and dependencies') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install node
                    node --version
                    npm --version

                    cd client
                    npm install
                    cd ../server
                    npm install
                '''
            }
        }
        stage('Start Server') {
            steps {
                dir('server') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        export DB="mongodb+srv://admin:admin123@cluster0.nswvsqy.mongodb.net/test"
                        export JWTPRIVATEKEY="123"
                        nohup npm start > output.log 2>&1 &
                        sleep 5
                    '''
                }
            }
        }
        stage('Start Client') {
            steps {
                dir('client') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nohup npm start > output.log 2>&1 &
                        sleep 5
                    '''
                }
            }
        }
        stage('Start Integration Tests') {
            steps {
                dir('client') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        npm run test
                    '''
                }
            }
        }
        stage('Start Unit Tests') {
            steps {
                dir('client') {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        npm run unit-test
                    '''
                }
            }
        }
        stage('Metrics 1 - Code Coverage') {
            steps {
                dir('client') {
                    sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    npm t -- --coverage
                '''
                }
            }
        }
    }
    triggers {
        pollSCM('* * * * *')
    }
}
