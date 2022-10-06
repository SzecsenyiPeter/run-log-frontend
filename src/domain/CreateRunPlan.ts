export interface CreateRunPlan {
    instructions: string;
    distance: number;
    heartRate?: number;
    duration?: number;
    assignedTo: Array<string>;
    date: Date;
}
