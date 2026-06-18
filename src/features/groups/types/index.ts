export interface Group {
  id: string;
  title: string;
  description: string;
}

export interface CreateGroupPayload {
  title: string;
  description?: string;
}

export interface GroupsResponse {
  status: boolean;
  data: Group[];
}

export interface CreateGroupResponse {
  status: boolean;
  data: Group;
}
