#!/usr/bin/env bash

echo "-> starting prisma migrations to mysql...\n"

cd /app/
./wait-for-it.sh db:3306 -- echo "db online\n" &&
npx prisma db push && npx prisma db seed 

npm run start:dev