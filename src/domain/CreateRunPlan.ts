export interface CreateRunPlan {
    instructions: string;
    distance?: number;
    assignedTo: Array<string>;
    date: Date;
}
