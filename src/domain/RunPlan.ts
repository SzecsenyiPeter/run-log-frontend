export interface RunPlan {
    id: number;
    instructions: string;
    distance?: number;
    assignedTo: string;
    date: Date;
}
