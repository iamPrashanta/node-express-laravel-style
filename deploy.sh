echo "Switching to branch main"
git checkout main

echo "Building the project"
# npm install
npm run build

echo "Deploying the project to the server"
scp -r ./dist/* root@143.110.191.156:/var/www/vhosts/admin.prash-app.in/multi-backend-prash-app/backend/node-express/dist/


echo "Done!!!"