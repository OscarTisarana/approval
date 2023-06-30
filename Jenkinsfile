pipeline {
    agent any
    
    stages {

        stage("download depedencies"){
            steps{
                nodejs ('NodeJS'){
                    sh('npm install')
                }
            }
        }

        stage("build"){
            steps{
                nodejs ('NodeJS'){
                    sh("npm run build")
                }
            }
        }
    }
    
    post{
        always{
            echo("Sedang coba")
        }
        success{
            echo("sukses")
        }
        failure{
            echo("gagal")
        }
    }
}