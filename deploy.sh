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

echo "Copying files"
scp -r $(pwd) webserver:/home/$DEPLOY_USER/$DEPLOY_HOST
