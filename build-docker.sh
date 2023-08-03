az acr login --name mysubway
docker build -t finance-service .
docker tag finance-service:latest mysubway.azurecr.io/finance-service:release-1.0.0.0
docker push mysubway.azurecr.io/finance-service:release-1.0.0.0
kubectl apply -f k8-dev/dev-deployment.yaml
