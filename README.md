# Azure DevOps Swimlane Extension

Swimlane custom work item control

## Usage

1. Go to Marketplace, search for "Swimlane Extension", add the free extension.

2. Under Organization Settings > Extension, approve the required scopes. This extension will need access to project and team data to get swimlanes and work item write to update swimlane.

3. In Organization Settings, under Board, go to Process. Custom control can only be added under inherited process, so inherit a process and move the intended project to that process if it is not already done so.

4. Click the inherited project, under Work item types tab, select the work item type and click on "Add custom control".

5. It is best to put this control with space underneath it. Due to how the control is configured in Azure DevOps, this custom control requires around 180 px in height.

## Important Links

**Extension SDK**: https://github.com/microsoft/azure-devops-extension-sdk
**Extension API**: https://github.com/microsoft/azure-devops-extension-api
**Extension Samples**: https://github.com/microsoft/azure-devops-extension-sample
**REST clients**: https://learn.microsoft.com/en-us/javascript/api/azure-devops-extension-api/
**Azure DevOps UI Components**: https://developer.microsoft.com/en-us/azure-devops/components
**Hot Reload and Debug**: https://github.com/microsoft/azure-devops-extension-hot-reload-and-debug
