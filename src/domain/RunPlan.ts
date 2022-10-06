export interface RunPlan {
    id: number;
    instructions: string;
    distance: number;
    heartRate?: number;
    duration?: number;
    assignedTo: string;
    date: Date;
}
