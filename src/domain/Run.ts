export interface Run {
    title: string;
    description?: string;
    durationInSeconds: number;
    distanceInMeters: number;
    date: Date;
}

export enum PaceUnit {
    MINUTES_PER_KILOMETER,
    MINUTES_PER_MILE,
}

export function calculatePaceInUnit(run: Run, paceUnit : PaceUnit) {
  const secondsPerMeters = run.durationInSeconds / run.distanceInMeters;
  switch (paceUnit) {
    case PaceUnit.MINUTES_PER_KILOMETER:
      return (secondsPerMeters / 60) * 1000;
    case PaceUnit.MINUTES_PER_MILE:
      return (secondsPerMeters / 60) * 1609;
    default:
      return secondsPerMeters;
  }
}
