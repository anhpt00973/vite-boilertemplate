import React, { useState, useEffect } from 'react';
import { Grid, Badge, Paper, Modal, FormControl,
          Fab, TextField, Button, Typography, Tab, Tabs, Select, InputLabel, MenuItem, Avatar
        } 
        from '@material-ui/core';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import classes from './EnterLot.module.css';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DialpadIcon from '@material-ui/icons/Dialpad';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AppsIcon from '@material-ui/icons/Apps';

const convertIcon = [ <FavoriteIcon />, <StarIcon />, <TrendingUpIcon />, <DialpadIcon />, <AddIcon />]

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 8,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function EnterLot(): JSX.Element {
  

  let i=0;
  let stringI = "";
  const [buttonArr, setButtonArr] = useState([{ id: 0, numberText: "01", counterPoints: 0 }])
  const groupButton = ([ 
    { id: 0, numberText: "01", counterPoints: 0 }, 
  ]);

  while (i<=100) {
    if (i<9) {
      stringI = "0" + (i+1).toString();
      groupButton[i] = {id: i, numberText: stringI, counterPoints: 0}
    }
    else if (i>=9 && i<99) {
      stringI = (i+1).toString();
      groupButton[i] = {id: i, numberText: stringI, counterPoints: 0}
    }
    else if (i==99) {
      stringI = "00";
      groupButton[i] = {id: i, numberText: stringI, counterPoints: 0}
    }
    i++;
  }
  useEffect(() => {
    setButtonArr(groupButton);
  },[]);  
  
  const rightClickCalled = (e: object) => {
    let thisId = 0;
    if (e.target.innerText == '00') {
      thisId = 99;
    }
    else {
      thisId = parseInt(e.target.innerText) - 1;
    }
    let newArr = [...buttonArr];
    if ( e.button == 0 ) {      
      newArr[thisId].counterPoints = buttonArr[thisId].counterPoints + 1;
      setButtonArr(newArr);
    }
    if ( e.button == 2 ) { 
      newArr[thisId].counterPoints = Math.max((buttonArr[thisId].counterPoints - 1), 0);
      setButtonArr(newArr);
    } 
  }

  const handleResetButtonPressed = () => {
    let newArr = [...buttonArr];
    let j = 0;
    while (j<100) {
      newArr[j].counterPoints = 0;
      setButtonArr(newArr);
      j++;
    }
  }

  const handleFullEvenButtonPressed = (e: object) => {
    let newArr = [...buttonArr];
    let j = 0;
    if ( e.button == 0 ) { 
      while (j<100) {
        if (j%2==1) {
          newArr[j].counterPoints = buttonArr[j].counterPoints + 1;
          setButtonArr(newArr);
        }
        j++;
      }
    }
    if (e.button ==2) {
      while (j<100) {
        if (j%2==1) {
          newArr[j].counterPoints = Math.max(buttonArr[j].counterPoints - 1, 0);
          setButtonArr(newArr);
        }
        j++;
      }
    }
  }

  const handleFullOddButtonPressed = (e: object) => {
    let newArr = [...buttonArr];
    let j = 0;
    if ( e.button == 0 ) { 
      while (j<100) {
        if (j%2==0) {
          newArr[j].counterPoints = buttonArr[j].counterPoints + 1;
          setButtonArr(newArr);
        }
        j++;
      }
    }
    if (e.button ==2) {
      while (j<100) {
        if (j%2==0) {
          newArr[j].counterPoints = Math.max(buttonArr[j].counterPoints - 1, 0);
          setButtonArr(newArr);
        }
        j++;
      }
    }
  }

  document.addEventListener("contextmenu", function (e){
    e.preventDefault();
  }, false);  
  let newPoints = 0;
  
  buttonArr.map((pointObj) => {
    if ((pointObj+1).counterPoints > 0) {
      newPoints = newPoints + j.counterPoints;
    }
  })
  
  var date = new Date();
  var dayStr = date.getDate().toString();
  var monthStr = (date.getMonth() + 1).toString();
  var year = date.getFullYear();
  if (parseInt(monthStr) < 10)  monthStr = "0" + monthStr;
  if (parseInt(dayStr) < 10)  dayStr = "0" + dayStr;
  var today = year.toString() + "-" + monthStr + "-" + dayStr;
  
  const [choiceSession, setChoiceSession] = React.useState<number>(0);
  const handleChoiceTheSession = (event: React.ChangeEvent<{}>, newChoiceSeesion: number) => {
    setChoiceSession(newChoiceSeesion);
  }; 

  const sessionArr = [
    {
      id: 0,
      label: 'Kiểu Mặc Định',
      icon: 4,
      counterPointSession: 0,
      sessionExplain: "Là kiểu đánh lộn đầu",
    },
    {
      id: 1,
      label: 'Kiểu Ưa Chuộng',
      icon: 1,
      counterPointSession: 0,
      sessionExplain: "Là kiểu đánh chặn đuôi",
    }
  ]

  const [sessionArrStorage, setSessionArrStorage] = React.useState([]);
  if (localStorage.getItem('sessionArrStorage') == null) {
    localStorage.setItem('sessionArrStorage', JSON.stringify(sessionArr));
  }
  const  newStorage = JSON.parse(localStorage.getItem('sessionArrStorage'));
  newStorage[0].counterPointSession = newPoints;
  useEffect(() => {
    setSessionArrStorage(newStorage);    
  },[]);

  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [nameSession, setNameSession] = React.useState("")
  const [choiceIcon, setChoiceIcon] = React.useState("")
  const [noteSession, setNoteSession] = React.useState("")
  const handleChangeChoiceIcon = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChoiceIcon(event.target.value as string);
  }

  const handleNewSessionBtnPress = () => {
    var newId = Math.max(...sessionArrStorage.map(o => o.id)) + 1;
    const newSession = {
      id: newId,
      label: nameSession,
      icon: parseInt(choiceIcon),
      counterPointSession: 0,
      sessionExplain: noteSession,
    }
    sessionArrStorage.push(newSession);
    if (nameSession) {
    localStorage.setItem('sessionArrStorage', JSON.stringify(sessionArrStorage));
    setOpenModal(false);
    }
    else alert("Vui lòng nhập Tên Kiểu Chơi!");
  }

  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editSessionId, setEditSessionId] = React.useState(0);
  const [editSessionName, setEditSessionName] = React.useState("");
  const [editSessionIcon, setEditSessionIcon] = React.useState(<DialpadIcon />);
  const [editSessionNote, setEditSessionNote] = React.useState("");
  // const handleOpenEditModal = () => {
  //   setOpenEditModal(true);
  // };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const editObject= [{id: 0, label: '', icon: 0, counterPointSession: 0, sessionExplain: ''}];
  const handleTabRightClick = (e: object) => {
    if ( e.button == 2 ) { 
      setOpenEditModal(true);
      if (e.target.outerText) {
        editObject[0] = sessionArrStorage.filter(session => (session.label).toUpperCase() == e.target.outerText);
        setEditSessionId(editObject[0][0].id);
        setEditSessionName(e.target.outerText);
        setEditSessionIcon(convertIcon[(editObject[0][0].icon)-1]);
        setEditSessionNote(editObject[0][0].sessionExplain);
      }
      else { 
        console.log('this is null'); 
        editObject[0] = sessionArrStorage.filter(session => (session.label).toUpperCase() == e.target.outerText);
        setEditSessionId(editObject[0][0].id);
        setEditSessionName(e.target.outerText);
        setEditSessionIcon(convertIcon[(editObject[0][0].icon)-1]);
        setEditSessionNote(editObject[0][0].sessionExplain);
      }
    } 
  }

  const handleDeleteSessionBtn = () => {
    const storageAfterDel = sessionArrStorage.filter(item => item.id !== editSessionId);
    localStorage.setItem('sessionArrStorage', JSON.stringify(storageAfterDel));
    setOpenEditModal(false);
    // console.log(storageAfterDel);
    window.location.reload();
  }

  const bodyModal = (
    <div style={modalStyle} className={classes.popuppaper}>
      <Typography variant='h5' align='center' >Thêm Kiểu Mới</Typography>
      <TextField 
        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>{
                          setNameSession(event.target.value as string);}} 
        label="Tên Kiểu Chơi" fullWidth></TextField>

      <FormControl id='choiceIconId' fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">Chọn Biểu Tượng</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={choiceIcon}
        onChange={handleChangeChoiceIcon}
        label="Age"
      >
        <MenuItem value="">
          <em>Không Dùng</em>
        </MenuItem>
        <MenuItem value={1}>
          <Avatar style={{ margin: 3 }}><FavoriteIcon /></Avatar> 
          <Typography variant='body1'> Favorite Icon</Typography>
        </MenuItem>
        <MenuItem value={2}>
          <Avatar style={{ margin: 3 }}><StarIcon /></Avatar> 
          <Typography variant='body1'> Star Icon</Typography>
        </MenuItem>
        <MenuItem value={3}>
          <Avatar style={{ margin: 3 }}><TrendingUpIcon /></Avatar> 
          <Typography variant='body1'> TrendingUp Icon</Typography>
        </MenuItem>
        <MenuItem value={4}>
          <Avatar style={{ margin: 3 }}><DialpadIcon /></Avatar> 
          <Typography variant='body1'> Dialpad Icon</Typography>
        </MenuItem>
        <MenuItem value={5}>
          <Avatar style={{ margin: 3 }}><AddIcon /></Avatar> 
          <Typography variant='body1'> Add Icon</Typography>
        </MenuItem>
      </Select>
      </FormControl>

      <TextField 
        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>{
          setNoteSession(event.target.value as string);}}
        label="Ghi Chú" fullWidth></TextField>
      <div align='center' style={{ margin: 15 }}>
        <Button onClick={handleNewSessionBtnPress} variant='contained' color='primary' >Thêm Vào</Button>
        <Button onClick={handleCloseModal} variant='contained'>Hủy Bỏ</Button>
      </div>
    </div>
  );

  const bodyEditSeesionModal = (
    <div style={modalStyle} className={classes.popuppaper}>
    <Typography variant='h5' align='center' >Thông Tin Kiểu Chơi</Typography>
    <TextField label="Tên Kiểu Chơi" fullWidth disabled value={editSessionName} style={{ marginTop: 8 }}
    >
    </TextField>
      <Grid container xs={12} >
        <Grid item xs={9}><TextField label="Kiểu Biểu Tượng" fullWidth disabled /> </Grid>
        <Grid item xs={3}><Avatar style={{ marginTop: 8 }}>{editSessionIcon}</Avatar></Grid>
      </Grid>
    <TextField label="Ghi Chú" fullWidth disabled value={editSessionNote} style={{ marginTop: 8 }}
    >
    </TextField>
    <div align='center' style={{ margin: 15 }}>
      <Button onClick={handleDeleteSessionBtn} variant='contained' color='secondary' >Xóa Kiểu Này</Button>
      <Button onClick={handleCloseEditModal} variant='contained'>Hủy Bỏ</Button>
    </div>
  </div>
  );

  return (
    <div className={classes.body}>
      <Grid container spacing={3}>

        {/* tổng thể */}
        <Grid item xs={12}>
          {/* <Paper className={classes.paper}> */}
            <div className={classes.paper}>
              <TextField 
                    id="date"
                    label=""
                    type="date"
                    defaultValue={today}
                    InputLabelProps={{shrink: true,}}
                    // onChange={(e) => {setDate(e.target.value)}}
              />
              <Typography variant="subtitle1"  >Tổng thể đã đánh : {newPoints} điểm </Typography>
              <div>
                {buttonArr.map((j) => { 
                  if (j.counterPoints != 0) {
                    return (
                      <label key={j.id}>{j.numberText}({j.counterPoints}), </label>
                    ) 
                  }
                }
                )}
              </div>  
            </div>
          {/* </Paper> */}
        </Grid>

        {/* choice The Session - cách đánh */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              {/* xem toan bo */}
              <Paper >
              <Button  aria-label="bold" fullWidth >
              
                <Typography variant='h5' >
                  <AppsIcon />
                  Xem Toàn Bộ
                </Typography>
              </Button>
              </Paper>

              <Tabs
                value={choiceSession}
                onChange={handleChoiceTheSession}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
              >
                {/* sessionArrStorage newStorage*/}
                {newStorage.map((sessions) => ( 
                  [
                    <Tab key={sessions.id} 
                        // value={sessions.id}
                        tabIndex={sessions.id}
                        onMouseDown={handleTabRightClick}
                        label={sessions.label} 
                        icon={convertIcon[sessions.icon-1]} 
                        {...a11yProps(sessions.id)}
                    />,
                    <StyledBadge badgeContent={sessions.counterPointSession}  color="primary"/>
                  ]
                ))}

                <Fab onClick={handleOpenModal} style={{ margin: 5 }} color="primary" aria-label="add" size='small'>
                  <AddIcon />
                </Fab>

              </Tabs>
              
              {/* thêm sesion mới  */}
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {bodyModal}
              </Modal>
              {/* rightclick to edit the session */}
              <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {bodyEditSeesionModal}
              </Modal>
          </Paper>
        </Grid>

        {/* chọn NHANH */}
        <Grid item xs={12}>
          <div className={classes.paper}>
          {/* <Typography variant='h6'>Chọn Nhanh</Typography> */}
            <Button variant="outlined" style={{ color: 'red', margin: 3 }} onClick={handleResetButtonPressed}>Reset</Button>
            <Button variant="outlined" style={{ color: 'blue', margin: 3 }} onMouseDown={handleFullEvenButtonPressed}>Full Chẵn</Button>
            <Button variant="outlined" style={{ color: 'blue', margin: 3 }} onMouseDown={handleFullOddButtonPressed}>Full Lẻ</Button>
          </div>
        </Grid>

        {/* chọn TAY */}
        <Grid item xs={12}>
          <div align='center'>
            <div className={classes.numberpaper}>
              {buttonArr.map((button) => {
              
                if (button.id <20) {
                  return (
                    <StyledBadge
                      key={button.id}
                      overlap="rectangular"
                      color="secondary"
                      badgeContent={(button.counterPoints)}
                      onMouseDown={rightClickCalled}
                    > 
                        <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                    </StyledBadge>
                  )
                }
                else if (button.id == 20 ) {
                  return ( 
                  <>
                    <p></p>
                    <StyledBadge
                      key={button.id}
                      overlap="rectangular"
                      color="secondary"
                      badgeContent={(button.counterPoints)}
                      onMouseDown={rightClickCalled}
                    > 
                        <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                    </StyledBadge> 
                  </>
                  )
                }
                else if (button.id > 20 && button.id <40 ) {
                  return (
                      <StyledBadge
                        key={button.id}
                        overlap="rectangular"
                        color="secondary"
                        badgeContent={(button.counterPoints)}
                        onMouseDown={rightClickCalled}
                      > 
                          <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                      </StyledBadge>
                    )
                }
                else if (button.id == 40 ) {
                  return ( 
                  <>
                    <p></p>
                    <StyledBadge
                      key={button.id}
                      overlap="rectangular"
                      color="secondary"
                      badgeContent={(button.counterPoints)}
                      onMouseDown={rightClickCalled}
                    > 
                        <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                    </StyledBadge> 
                  </>
                  )
                }
                else if (button.id > 40 && button.id <60 ) {
                  return (
                      <StyledBadge
                        key={button.id}
                        overlap="rectangular"
                        color="secondary"
                        badgeContent={(button.counterPoints)}
                        onMouseDown={rightClickCalled}
                      > 
                          <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                      </StyledBadge>
                    )
                }
                else if (button.id == 60 ) {
                  return ( 
                  <>
                    <p></p>
                    <StyledBadge
                      key={button.id}
                      overlap="rectangular"
                      color="secondary"
                      badgeContent={(button.counterPoints)}
                      onMouseDown={rightClickCalled}
                    > 
                        <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                    </StyledBadge> 
                  </>
                  )
                }
                else if (button.id > 60 && button.id <80 ) {
                  return (
                      <StyledBadge
                        key={button.id}
                        overlap="rectangular"
                        color="secondary"
                        badgeContent={(button.counterPoints)}
                        onMouseDown={rightClickCalled}
                      > 
                          <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                      </StyledBadge>
                    )
                }
                else if (button.id == 80 ) {
                  return ( 
                  <>
                    <p></p>
                    <StyledBadge
                      key={button.id}
                      overlap="rectangular"
                      color="secondary"
                      badgeContent={(button.counterPoints)}
                      onMouseDown={rightClickCalled}
                    > 
                        <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                    </StyledBadge> 
                  </>
                  )
                }
                else if (button.id > 80 && button.id <100 ) {
                  return (
                      <StyledBadge
                        key={button.id}
                        overlap="rectangular"
                        color="secondary"
                        badgeContent={(button.counterPoints)}
                        onMouseDown={rightClickCalled}
                      > 
                          <Button variant="outlined" className={classes.button} >{button.numberText}</Button>
                      </StyledBadge>
                    )
                }

              })
              }
            </div>  
          </div>
        </Grid>

      </Grid>
    </div>
  );
}

export default EnterLot;
