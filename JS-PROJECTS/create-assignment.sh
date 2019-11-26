#! /bin/bash
#if[!$1]
#then
#    echo "Err: missing Argument Project Name"
#    exit
#fi
PROJECT_NAME=$1
echo "CREATING JS PROJECT $PRPOJECT_NAME"

mkdir $PROJECT_NAME
touch "$PROJECT_NAME/index.html"
touch "$PROJECT_NAME/script.js"
touch "$PROJECT_NAME/style.css"

echo "DONE"
exit

