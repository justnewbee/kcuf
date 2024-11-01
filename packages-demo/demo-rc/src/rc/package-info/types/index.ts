export interface IPackageInfoContent {
  name: string;
  version: string;
  description: string;
}

export interface IPackageInfoProps {
  pkg: IPackageInfoContent;
}