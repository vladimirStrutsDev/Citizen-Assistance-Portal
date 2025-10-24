export interface RouteHandle {
  title: string;
  description?: string;
  requiresAuth?: boolean;
}

export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  handle?: RouteHandle;
  children?: RouteConfig[];
}
