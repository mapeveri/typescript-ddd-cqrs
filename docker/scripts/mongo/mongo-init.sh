#!/bin/bash
echo "Mongo init"
sleep 10

mongosh --host mongo1:27017 <<EOF
  cfg = {
    "_id": "rs0",
    "members": [
      { "_id": 0, "host": "mongo1:27017" }
    ]
  };
  rs.initiate(cfg);
EOF
