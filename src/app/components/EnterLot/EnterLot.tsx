import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Badge, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

function EnterLot(): JSX.Element {
  const classes = useStyles();
  const number = '83';
  const [count, setCount] = useState(0);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* tổng thể */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div align="left">
              <button>Tổng Thể</button>
            </div>
            <text>tổng thể đã đánh : 22(5),13(5),33(55),93(12)...</text>
            <div align="right">
              <text>15-09-2022</text>
            </div>
          </Paper>
        </Grid>
        {/* cách đánh */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Cách Đánh 1, Cách Đánh 2 ... +
          </Paper>
        </Grid>
        {/* chọn nhanh */}
        <Grid item xs={12}>
          <div className={classes.paper}>
            Chọn nhanh : Reset, Full Chẵn, Full Lẻ
          </div>
        </Grid>
        {/* chọn tay */}
        <Grid item xs={12}>
          <div className={classes.paper}>
            <p>Chọn tay : </p>
            <Badge
              color="secondary"
              badgeContent={count}
              onClick={() => {
                setCount(count + 1);
              }}
              // onAuxClick={() => {
              // setCount(Math.max(count - 1, 0));
              // }}
            >
              <button>{number}</button>
            </Badge>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default EnterLot;
