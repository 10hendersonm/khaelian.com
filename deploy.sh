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

DEPLOY_PATH=/home/$DEPLOY_USER/$DEPLOY_HOST

echo "Copying files"
scp -r $(pwd) webserver:$DEPLOY_PATH

echo "Dockerizing"
ssh webserver "cd $DEPLOY_PATH && docker build -t webserver:latest ."
