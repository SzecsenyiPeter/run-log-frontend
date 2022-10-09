import { xml2js } from 'xml-js';

export interface TcxResult {
    duration: number;
    distance: number;
    heartRate: number;
}

interface TextValue {
    _text: string;
}

interface TcxFile {
    TrainingCenterDatabase: {
        Activities: {
            Activity: {
                Lap: Array<{
                    TotalTimeSeconds: TextValue,
                    DistanceMeters: TextValue,
                    AverageHeartRateBpm: {
                        Value: TextValue
                    }
                }>
            };
        }
    },
}

export const convertTcx = (file: string) : TcxResult => {
  const laps = (xml2js(file, { compact: true }) as TcxFile)
    .TrainingCenterDatabase.Activities.Activity.Lap;

  return laps.reduce((tcxResult, lap, _, { length }) => ({
    duration: parseInt(lap.TotalTimeSeconds._text, 10) + tcxResult.duration,
    distance: parseInt(lap.DistanceMeters._text, 10) + tcxResult.distance,
    heartRate: (parseInt(lap.AverageHeartRateBpm.Value._text, 10) / length) + tcxResult.heartRate,
  }), { duration: 0, distance: 0, heartRate: 0 } as TcxResult);
};
