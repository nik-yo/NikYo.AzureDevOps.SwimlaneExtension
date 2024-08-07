import "./swimlane.scss"

import * as SDK from "azure-devops-extension-sdk"
import * as React from "react"

import { CommonServiceIds, getClient, IHostNavigationService, IProjectPageService } from "azure-devops-extension-api"
import { Board, WorkRestClient } from "azure-devops-extension-api/Work"
import {
  IWorkItemFormService,
  IWorkItemLoadedArgs,
  WorkItemTrackingServiceIds
} from "azure-devops-extension-api/WorkItemTracking"
import { Dropdown } from "azure-devops-ui/Dropdown"
import { IListBoxItem } from "azure-devops-ui/ListBox"
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection"
import { createRoot } from "react-dom/client"

interface SwimlaneFieldState {
  disabled: boolean,
  swimlane: string,
  swimlaneRefName: string,
  swimlanes: IListBoxItem<{}>[]
}

class SwimlaneField extends React.Component<{}, SwimlaneFieldState> {
  private selection = new DropdownSelection();

  constructor(props: {}) {
    super(props);
    this.state = {
      disabled: true,
      swimlane: '',
      swimlaneRefName: '',
      swimlanes: []
    }
  }

  public componentDidMount() {
    SDK.init().then(() => {
      this.registerEvents();
    });
  }

  private registerEvents() {
    SDK.register(SDK.getContributionId(), () => {
      return {
        onLoaded: async (args: IWorkItemLoadedArgs) => {
          // const workItemId = args.id;
          const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
          const project = await projectService.getProject();

          if (!project) { return; }
          
          const nav = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);
          const currentTeamName = (await nav.getPageRoute()).routeValues['teamName'];

          const workItemFormService = await SDK.getService<IWorkItemFormService>(
            WorkItemTrackingServiceIds.WorkItemFormService
          );

          const currentSwimlane = await workItemFormService.getFieldValue("System.BoardLane", { returnOriginalValue: false }) as string;
          const workItemType = await workItemFormService.getFieldValue("System.WorkItemType", { returnOriginalValue: false }) as string;
          
          const workClient = getClient(WorkRestClient);

          let board: Board | undefined = undefined;
          let listBoxItems: IListBoxItem[] = [];
          
          if (currentTeamName) {
            const teamContext = {
              project: project.name,
              projectId: project.id,
              team: currentTeamName,
              teamId: ''
            }
  
            const backlogs = await workClient.getBacklogs(teamContext);
            const witBacklogs = backlogs.filter((b) => b.workItemTypes.findIndex((witRef) => witRef.name === workItemType) > -1);
  
            if (witBacklogs.length) {
              board = await workClient.getBoard(teamContext, witBacklogs[0].name);
              listBoxItems = board.rows.map<IListBoxItem>((row) => ({id: row.id, text: row.name || '(Default lane)', data: row.name }));
            }
          }
          
          if (listBoxItems.length) {
            SDK.resize(undefined, listBoxItems.length * 60);
          }

          this.setState({
            disabled: listBoxItems.length < 1,
            swimlane: currentSwimlane || '(Default lane)',
            swimlaneRefName: board?.fields.rowField.referenceName || '',
            swimlanes: listBoxItems
          })

          const selectedIndex = board?.rows.findIndex((row) => row.name === (currentSwimlane || null));
          if (selectedIndex !== undefined && selectedIndex > -1) {
            this.selection.select(selectedIndex);
          }
        }
      }
    })
  }

  private onSelect = async (event: React.SyntheticEvent<HTMLElement>, item: IListBoxItem<{}>) => {
    const workItemFormService = await SDK.getService<IWorkItemFormService>(
      WorkItemTrackingServiceIds.WorkItemFormService
    );
    workItemFormService.setFieldValue(
      this.state.swimlaneRefName,
      item.data || ''
    );
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="work-item-label-container">
          <label className="work-item-label secondary-text">Swimlane</label>
        </div>
        <div>
          <Dropdown
            ariaLabel="Swimlane"
            className="swimlane-dropdown"
            placeholder="Swimlanes"
            items={this.state.swimlanes}
            selection={this.selection}
            noItemsText="No swimlanes"
            disabled={this.state.disabled}
            onSelect={this.onSelect} />
        </div>
      </>
    )
  }
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<SwimlaneField />);