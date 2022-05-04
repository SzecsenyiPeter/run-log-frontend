import { Run } from './Run';
import { RunPlan } from './RunPlan';

export interface RunGroup {
    groupables: Array<Run | RunPlan>;
    date: Date;
}
