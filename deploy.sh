mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo $DEPLOY_SSH_PRIVATE_KEY >> ~/.ssh/id_rsa
ssh-agent -s
ssh-add ~/.ssh/id_rsa

ssh $DEPLOY_USER@$DEPLOY_HOST "echo foo >> ~/test"
