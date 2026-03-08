export interface Feature {
  id: string;
  name: string;
  pricePerUser: number;
  defaultChecked: boolean;
}

export const FEATURES: Feature[] = [
  { id: "cfo-consultant", name: "Part-time CFO Consultant", pricePerUser: 500, defaultChecked: true },
  { id: "wip-reporting", name: "WIP Report Preparation", pricePerUser: 200, defaultChecked: true },
  { id: "cash-flow", name: "Cash Flow Forecasting", pricePerUser: 150, defaultChecked: true },
  { id: "job-costing", name: "Job Cost Analysis", pricePerUser: 120, defaultChecked: true },
  { id: "financial-reports", name: "Monthly Financial Reports", pricePerUser: 180, defaultChecked: true },
  { id: "kpi-dashboards", name: "KPI Dashboards", pricePerUser: 100, defaultChecked: false },
  { id: "variance-analysis", name: "Budgeting & Variance Analysis", pricePerUser: 150, defaultChecked: false },
  { id: "divisional-pl", name: "Divisional P&L Reports", pricePerUser: 130, defaultChecked: true },
  { id: "compliance", name: "Prevailing Wage Compliance", pricePerUser: 90, defaultChecked: false },
];

export const DEFAULT_TEAM_SIZE = 5;
export const MIN_TEAM_SIZE = 1;
export const MAX_TEAM_SIZE = 500;
