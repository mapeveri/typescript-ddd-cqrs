K8S configuration
=================

Getting started
---------------

1. To run in local install minikube and kubectl

2. Copy .k8s/secret.yaml.txt to .k8s/secret.yaml and configure it

3. Start minikube


    minikube start

4. Execute


    sh .k8s/apply.sh

5. Serve app:


    kubectl expose pod podName --type=NodePort --name=app-service

    minikube service app-service --url

    kubectl delete service app-service

# Docker registry

When we will need to push the image to docker hub we will need this commands:

  ```bash
    docker login 

    docker build -t mapeveri/languages:latest .

    docker tag mapeveri/languages:latest mapeveri/languages:latest

    docker push mapeveri/languages:latest
  ```

3. Copy .k8s/secret.yaml.txt to .k8s/secret.yaml and configure it

# Encrypt secret values:

  ```bash
echo -n "my-secret" | base64
```

# Kubernetes Commands Reference

## Get Information

- **Nodes**:
  ```bash
  kubectl get nodes -o wide # Get internal IP
  ```

- **Pods**:
  ```bash
  kubectl get pods -n default # Get pods from default namespace
  ```

- **Deployments**:
  ```bash
  kubectl get deployment # Deployment status
  ```

- **Services**:
  ```bash
  kubectl get service # Service status
  ```

## Describe Resources

- **Pod**:
  ```bash
  kubectl describe pod app # Pod details
  ```

- **Service**:
  ```bash
  kubectl describe svc app # Service details
  ```

## Operations

- **Rollout Restart**:
  ```bash
  kubectl rollout restart deployment/languages # Restart pods
  ```

## Configuration

- **Config Map**:
  ```bash
  kubectl get configmap app-config -o yaml # Config map details
  ```

## Interact with Pods

- **Access Shell**:
  ```bash
  kubectl exec -it app -- /bin/bash # Enter the pod
  ```

- **List Environment Variables**:
  ```bash
  kubectl exec -it app -- env # List pod environment variables
  ```

- **Container Logs**:
  ```bash
  kubectl logs app # View container logs
  ```

- **Create secret**:
  ```bash
  kubectl create secret generic languages-app-secret --from-literal=GOOGLE_CLIENT_ID=password
  ```

- **Delete secret**:
  ```bash
  kubectl delete secret languages-app-secret
  ```

- **Display secret value**:
  ```
  kubectl get secret languages-secret -n default -o jsonpath="{.data.GOOGLE_CLIENT_ID}" | base64 --decode
  ```
