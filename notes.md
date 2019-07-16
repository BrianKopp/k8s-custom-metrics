# Notes and Actions

Create a namespace `hpa`.

Create the deployment: `kubectl apply -f manifests/deployment.yaml`.

Create the service: `kubectl apply -f manifests/service.yaml`.

Get the service's URL: `minikube service per-pod-metric --url --namespace=hpa`.

Validate the service endpoint: `curl 192.168.99.100:31533`.
