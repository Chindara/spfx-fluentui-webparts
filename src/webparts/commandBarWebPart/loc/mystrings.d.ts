declare interface ICommandBarWebPartWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'CommandBarWebPartWebPartStrings' {
  const strings: ICommandBarWebPartWebPartStrings;
  export = strings;
}
