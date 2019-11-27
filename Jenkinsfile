pipeline {
    agent any
    stages {
        stage('One') {
                steps {
                        echo 'Hi, this is a test by David'
			
                }
        }
	    stage('Two'){
		    
		steps {
			//input('Do you want to proceed?')
			echo "This is step TWO"
        }
	    }
        stage('Three') {
                when {
                        not {
                                branch "master"
                        }
                }
                steps {
			echo "Hello"
                        }
        }
        stage('Four') {
                parallel {
                        stage('Unit Test') {
                                steps{
                                        echo "Running the unit test..."
                                }
                        }
                        stage('Integration test') {
                        agent {
                                docker {
                                        reuseNode false
					image 'ubuntu'
                                        }
			}
				steps {
					echo 'Running the integration test..'
				}
                               
			}  }
        }
    }
}
