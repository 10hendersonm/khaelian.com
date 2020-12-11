echo "Creating ssh files"
mkdir -p ~/.ssh
echo $DEPLOY_SSH_PRIVATE_KEY > ~/.ssh/id_rsa
echo $DEPLOY_SSH_PUBLIC_KEY > ~/.ssh/id_rsa.pub
chmod -R 700 ~/.ssh

echo "Starting ssh agent"
eval `ssh-agent -s`
echo "Configuring ssh agent"
ssh-add ~/.ssh/id_rsa

echo "Attempting ssh connection"
ssh $DEPLOY_USER@$DEPLOY_HOST "echo foo >> ~/test"
