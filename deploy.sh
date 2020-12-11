echo "Creating ssh files"
mkdir -p ~/.ssh
sudo chmod 700 ~/.ssh
echo $DEPLOY_SSH_PRIVATE_KEY >> ~/.ssh/id_rsa
chmod 700 ~/.ssh/id_rsa

echo "Starting ssh agent"
eval `ssh-agent -s`
echo "Configuring ssh agent"
ssh-add ~/.ssh/id_rsa

echo "Attempting ssh connection"
ssh $DEPLOY_USER@$DEPLOY_HOST "echo foo >> ~/test"
