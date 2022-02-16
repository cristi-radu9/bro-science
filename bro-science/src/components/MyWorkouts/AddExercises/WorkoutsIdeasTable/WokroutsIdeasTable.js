import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const WorkoutsIdeasTable=(props)=>{

    return (
        <div className="w-60 mb4">
            <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Workout Ideas</TableCell>
                <TableCell align="right">Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.workoutIdeas.map((workout) => (
                <TableRow key={workout.name}>
                  <TableCell component="th" scope="row">
                    {workout.name}
                  </TableCell>
                  <TableCell align="right"><a className="no-underline" href={workout.link} target="_blank" rel="noopener noreferrer">Video Here</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
}

export default WorkoutsIdeasTable;