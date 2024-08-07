# Azure DevOps Swimlane Extension

Swimlane custom work item control

## Usage

1. Go to Marketplace, search for "Swimlane Extension", add the free extension.

2. Under Organization Settings > Extension, approve the required scopes. This extension will need access to project and team data to get swimlanes and work item write to update swimlane.

3. In Organization Settings, under Board, go to Process. Custom control can only be added under inherited process, so inherit a process and move the intended project to that process if it is not already done so.

4. Click the inherited project, under Work item types tab, select the work item type and click on "Add custom control".

5. If the list of swimlanes are not correct, please reload the window (see Limitations).

## Limitations

Since SDK.getPageContext() is not working very well, this extension will attempt to get team from route, but route is not updated when team is changed through drop down. A workaround is to reload the page.

Extension is actually embedded as iframe, but that cause the control to be limited by the iframe height, so this extension will resize the iframe based on the number of swimlanes multiplied by 60 px so that when the dropdown is expanded, all swimlanes will be visible.

## Important Links

**Extension SDK**: https://github.com/microsoft/azure-devops-extension-sdk
**Extension API**: https://github.com/microsoft/azure-devops-extension-api
**Extension Samples**: https://github.com/microsoft/azure-devops-extension-sample
**REST clients**: https://learn.microsoft.com/en-us/javascript/api/azure-devops-extension-api/
**Azure DevOps UI Components**: https://developer.microsoft.com/en-us/azure-devops/components
**Hot Reload and Debug**: https://github.com/microsoft/azure-devops-extension-hot-reload-and-debug
**REST API**: https://learn.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-7.2&preserve-view=true
**TFX CLI**: https://github.com/microsoft/tfs-cli/blob/master/docs/extensions.md

## Extension Page

https://marketplace.visualstudio.com/items?itemName=nikki-yodo.nikyo-swimlane-extension