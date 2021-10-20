import React from 'react';
import { getRuns } from '../Api';
import { Run } from '../domain/Run';

const AllRunList: React.FC = () => {
  const runs = getRuns();
  return (
    <div>
      <table className="ui celled table">
        <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Duration</th>
          <th>Distance</th>
        </thead>
        {runs.map((run : Run) => (
          <tr>
            <td>{run.title}</td>
            <td>{run.description}</td>
            <td>{`${run.durationInSeconds} s`}</td>
            <td>{`${run.distanceInMeters} m`}</td>
          </tr>
        ))}

      </table>
    </div>
  );
};
export default AllRunList;
