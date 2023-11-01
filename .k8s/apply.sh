cd .k8s/

for file in *.yaml; do
  echo "Applying $file"
  kubectl apply -f "$file"
done
