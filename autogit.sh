#!/bin/bash

if [ "$#" -gt 1 ]; then
  echo "Too many arguments"
  exit 1;
fi

git add .
if [ "$#" -eq 1 ]; then
  git commit -m "$1"
else
  git commit -m "edits"
fi
git push
