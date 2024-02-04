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


    kubectl expose pod app --type=NodePort --name=app-service

    minikube service app-service --url

Commands
--------

Kubectl utilities:

    kubectl get deployment # Status deployment
    kubectl get service # Status service

    kubectl get pods -n default # Get pods from default namespace

    kubectl describe pod app # Pod data
    kubectl describe svc app

    kubectl get nodes -o wide # To get the internal IP

    kubectl rollout restart deployment/languages # Rollout pods

    kubectl get configmap app-config -o yaml # Config map data

    kubectl exec -it app -- /bin/bash # Enter to the pod

    kubectl exec -it app -- env # List env variables pod
