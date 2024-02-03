K8S configuration
=================

Getting started
---------------

1. Install minikube and kubectl

2. Docker push image:

    docker login 

    docker tag languages:latest mapeveri/languages:latest

   docker push mapeveri/languages:latest

3. Execute:

    sh .k8s/apply.sh

4. Serve app:

    minikube service app

Commands
--------

Kubectl utilities:

    kubectl get deployment # Status deployment
    kubectl get service # Status service

    kubectl get pods -n default # Get pods from default namespace

    kubectl describe pod languages # Pod data

    kubectl get nodes -o wide # To get the internal IP

    kubectl rollout restart deployment/languages # Rollout pods

    kubectl describe svc app