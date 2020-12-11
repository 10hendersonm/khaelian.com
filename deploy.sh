echo "Creating ssh files"
mkdir -p ~/.ssh/
echo "$DEPLOY_SSH_PRIVATE_KEY" > ~/.ssh/webserver.key
chmod 600 ~/.ssh/webserver.key
cat >>~/.ssh/config <<END
HOST webserver
    HostName $DEPLOY_HOST
    User $DEPLOY_USER
    IdentityFile ~/.ssh/webserver.key
    StrictHostKeyChecking no
END

DEPLOY_DIR=/home/$DEPLOY_USER
DEPLOY_PATH=$DEPLOY_DIR/$DEPLOY_HOST

echo "Copying files"
scp -r $(pwd) webserver:$DEPLOY_DIR

# echo "Stopping / Removing Docker Containers"
# ssh webserver "
# docker stop $(docker ps -aq)
# docker rm $(docker ps -aq)
# '

echo "Dockerizing"
ssh webserver "
cd $DEPLOY_PATH
docker build -t webserver:latest .
docker run -d -p 80:8080 webserver
"
