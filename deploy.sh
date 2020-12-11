echo "Creating ssh files"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo $DEPLOY_SSH_PRIVATE_KEY >> ~/.ssh/id_rsa

echo "Configuring ssh agent"
ssh-agent -s
ssh-add ~/.ssh/id_rsa

echo "Attempting ssh connection"
ssh $DEPLOY_USER@$DEPLOY_HOST "echo foo >> ~/test"
