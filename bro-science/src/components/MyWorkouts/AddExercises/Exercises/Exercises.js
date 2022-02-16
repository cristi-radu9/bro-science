import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DenseTable(props) {
    const classes = useStyles();
    return (
        <div className="w-60 mb4">
            {props.exercise.length>=1
                && <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Workout</TableCell>
                                <TableCell align="right">Reps&nbsp;</TableCell>
                                <TableCell align="right">Sets&nbsp;</TableCell>
                                {props.checkAdd
                                &&<TableCell align="right">Delete&nbsp;</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.exercise.map((row) => (
                                <TableRow key={row.name + row.reps + row.sets}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.reps}</TableCell>
                                    <TableCell align="right">{row.sets}</TableCell>
                                    {props.checkAdd
                                    &&<TableCell align="right" className="pointer" onClick={() => props.onDelete(row.name + row.reps + row.sets)}>x</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}

