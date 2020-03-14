#!/bin/bash
set -e

mongo <<EOF
  use mern-shop
  db.createUser({
      user: '$MONGO_USER',
      pwd: '$MONGO_PWD',
      roles: [
          {
              role: 'readWrite',
              db: 'mern-shop',
          },
      ],
  });
EOF
