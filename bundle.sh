#!/bin/bash

rm -rf ./dist

mkdir ./dist

# 子应用
cp -r ./child-ui/dist/ ./dist/child-ui/

# main基座
cp -r ./main-ui/dist/ ./dist/main-ui/

# cd ./dist
# zip -r mp$(date +%Y%m%d%H%M%S).zip *
# cd ..
echo 'bundle.sh execute success.'
