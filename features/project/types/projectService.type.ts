export interface IProjectManifestService {
    key: string;
    name: string;
    description: string;
    status: string;
    plan: string;
    icon?: string;
    resources: IServiceResource[];
}

export interface IServiceResource {
    key: string;
    label: string;
    route: string;
    icon?: string;
    columns?: IServiceColumn[] | null;
    actions?: IServiceAction[] | null;
    filters?: IServiceFilter[] | null;
}

export interface IServiceAction {
    key: string;
    label: string;
    scope: string;
    variant: string;
    danger: boolean;
}

export interface IServiceColumn {
    key: string;
    label: string;
    type: string;
    sortable: boolean;
    visible: boolean;
}

export interface IServiceFilter {
    key: string;
    label: string;
    type: string;
}
