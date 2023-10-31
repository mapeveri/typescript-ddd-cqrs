for file in .k8s/*.yaml; do
  echo "Applying $file"
  kubectl apply -f "$file"
done
