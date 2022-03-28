export interface Run {
    id?: string;
    title: string;
    description?: string;
    durationInSeconds: number;
    distanceInMeters: number;
    heartRate: number;
    date: Date;
}

export enum PaceUnit {
    MINUTES_PER_KILOMETER,
    MINUTES_PER_MILE,
}

export function calculatePaceInUnit(duration: number, distance: number, paceUnit : PaceUnit) {
  const secondsPerMeters = duration / distance;
  switch (paceUnit) {
    case PaceUnit.MINUTES_PER_KILOMETER:
      return (secondsPerMeters / 60) * 1000;
    case PaceUnit.MINUTES_PER_MILE:
      return (secondsPerMeters / 60) * 1609;
    default:
      return secondsPerMeters;
  }
}
