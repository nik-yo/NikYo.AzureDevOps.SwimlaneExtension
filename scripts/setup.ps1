# https://learn.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops

npm install -g tfx-cli

tfx extension init

# launch dev
npm run start:dev

# publish
npm run publish:dev # PAT required and need to be All accessible org with Marketplace (Publish) write access

npm run publish