K8S configuration
=================

Getting started
---------------

1. Install minikube and kubectl

2. Execute:

    sh .k8s/apply.sh

3. Docker push imagen:

    docker login 

    docker tag languages:latest mapeveri/languages:latest

    docker push languages:latest

Commands
--------

Kubectl utilities:

    kubectl get deployment # Status deployment
    kubectl get service # Status service

    kubectl get pods -n default # Get pods from default namespace

    kubectl describe pod languages # Pod data

    kubectl get nodes -o wide # To get the internal IP

    kubectl rollout restart deployment/languages # Rollout pods
