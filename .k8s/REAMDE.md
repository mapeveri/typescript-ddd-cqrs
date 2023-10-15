K8S configuration
=================

Getting started
---------------

1. Install minikube and kubectl

2. Create a docker registry:

    kubectl create secret docker-registry nombre-del-secreto --docker-server=localhost:5000 --docker-username=tu-usuario --docker-password=tu-contraseña --docker-email=tu-email

  Example:

    kubectl create secret docker-registry test-registry --docker-server=localhost:5000 --docker-username=mapeveri --docker-password=martin --docker-email=martinpeveri@gmail.com

3. Execute:

    kubectl apply -f .k8s/docker-registry-deployment.yaml
    kubectl apply -f .k8s/docker-registry-service.yaml
    kubectl apply -f .k8s/deployment.yaml
    kubectl apply -f .k8s/service.yaml


Commands
--------

Kubectl utilities:

    kubectl get deployment # Status deployment
    kubectl get service # Status service

    kubectl describe pod languages # Pod data

    kubectl get secret test-registry -o yaml # To check if exists the registry

    kubectl get nodes -o wide # To get the internal IP

Docker push imagen:

    docker login localhost:5000

    docker tag languages:latest localhost:5000/languages:latest

    docker push localhost:5000/languages:latest

Check if image is pushed:

    curl http://localhost:5000/v2/languages/tags/list
