echo "Creating ssh files"
mkdir -p ~/.ssh/
echo $DEPLOY_SSH_PRIVATE_KEY > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
cat >>~/.ssh/config <<END
HOST webserver
    HostName $DEPLOY_HOST
    User $DEPLOY_USER
    IdentityFile ~/.ssh/id_rsa
    StrictHostKeyChecking no
END

ssh webserver 'echo foo >> ~/test'
