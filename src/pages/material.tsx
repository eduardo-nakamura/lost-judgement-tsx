import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemButton, Fab, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Stack, Button, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { materialList, MaterialCheckList } from "../assets/mockup"
import { BtnMat, BtnContainer, BtnClear } from "./styles"

const initValue: MaterialCheckList[] = []

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Material() {
  const materialListInit = materialList
  const [rows, setRows] = useState(materialListInit);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [checkList, setcheckList] = useState(initValue);
  const [expanded, setExpanded] = useState("panel0");
  const [open, setOpen] = useState(false);

  const tableHeaderStyle = { color: '#35dfdf', borderBottom: '1px solid #35dfdf', textAlign: 'center', padding: '10px 0' };
  const tableHeaderStyleLoc = { color: '#35dfdf', borderBottom: '1px solid #35dfdf', textAlign: 'center', padding: '10px 0', display: { xs: 'none', md: 'block' } };
  const tableBodyStyle = { color: '#fff', textAlign: 'center' }
  const tableBodyStyleLoc = { color: '#fff', textAlign: 'center', display: { xs: 'none', md: 'block' } }
  const tableRowStyle = { borderLeft: '5px solid #35dfdf' };
  const showText = { height: 'auto' };
  const hideText = {
    height: '25.8px',
    overflowY: 'hidden',
    "&:hover ": {
      color: '#35dfdf'
    },
  };

  useEffect(() => {
    getCheckList()
  }, [])
  useEffect(() => {
    const results = materialListInit.filter((man) =>
      man.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRows(results)
  }, [searchTerm]);

  useEffect(() => {
    saveCheckList();
  }, [checkList]);

  const saveCheckList = () => {
    localStorage.setItem('checkList', JSON.stringify(checkList))
  }

  const getCheckList = () => {
    if (localStorage.getItem('checkList') === null) {
      localStorage.setItem('checkList', JSON.stringify([]))
    } else {
      let todoLocal = localStorage.getItem('checkList')
      if (todoLocal) {
        setcheckList(JSON.parse(todoLocal))
      }

    }
  }

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    setShowSearch(true)
  };

  function getPrice(cost: any[], val: string, qty: number) {

    let valType = "¥"
    switch (val) {
      case "Gambling Hall":
        valType = "Tags"
        break;
      case "Onodera's Wares":
        valType = "SP"
        break;
      case "Encounters":
      case "Lost Item Reward":
      case "Heaven's Golf":
      case "Robotics Club Matches":
      case "Rare Cat Reward":
      case "Common Cat Reward":
      case "Found on the ground":
        valType = "-"
        break;
      case "Casino":
      case "Heaven's Door Casino":
        valType = "Chips"
        break;
      case "Shogi":
        valType = "Shogi"
        break;
      default:
        valType = "¥"
        break;
    }
    let priceFiltered = cost.filter(price => price.type === valType);
    return valType === "-" ? "" : `- ${priceFiltered[0].value * qty} ${priceFiltered[0].type}`
  }

  function addMaterial(material: { id: number; name: string; cost: { value: number; type: string; }[]; location: string[]; }) {
    const checkUsername = (obj: { id: number; }) => obj.id === material.id;

    if (!checkList.some(checkUsername)) {
      let addMaterialRow: MaterialCheckList = {
        id: material.id,
        qty: 1,
        name: material.name,
        cost: material.cost,
        location: material.location,
        check: false
      }
      setcheckList(prevArray => [...prevArray, addMaterialRow])
      setSearchTerm('');
      setOpen(true);
    }
  }

  const addHandler = (id: number) => {
    setcheckList(checkList.map(item => {
      if (item.id === id) {
        return {
          ...item, qty: item.qty + 1
        }
      }
      return item;
    }))
  }


  const removeHandler = (id: number) => {
    setcheckList(checkList.map(item => {
      if (item.id === id) {
        if (item.qty > 1) {
          return {
            ...item, qty: item.qty - 1
          }
        }
      }
      return item;
    }))
  }

  const checkMaterial = (id: number) => {

    setcheckList(checkList.map(item => {
      if (item.id === id) {
        return {
          ...item, check: !item.check
        }
      }
      return item;
    }))
  }

  const removeMaterial = (id: number) => {
    setcheckList(checkList.filter((el) => el.id !== id))
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>

      <Typography sx={{ textAlign: 'center', color: '#fff', fontSize: '40px', padding: '20px 0' }}>
        Material Checklist

      </Typography>
      <Container>
        <Grid container spacing={1}>

          <Grid item xs={showSearch ? 12 : 2} md={showSearch ? 3 : 1}>
            <Box sx={{ background: '#35dfdf', padding: '10px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

              {showSearch && (
                <TextField
                  sx={{ width: '80%' }}
                  id="outlined-required"
                  label="Search Material Name"
                  value={searchTerm}
                  onChange={handleChange}
                />
              )}
              <Fab size="small" onClick={() => setShowSearch(!showSearch)} aria-label="like">
                <ExpandMoreIcon style={{ transform: showSearch ? 'rotate(90deg)' : 'rotate(270deg)', fontSize: 40 }} />
              </Fab>

            </Box>
            {showSearch && (
              <Box style={{ color: '#fff', background: '#35dfdf' }}>
                <List>

                  {rows.slice(0, 20).map((row) => (
                    <ListItem disablePadding key={'search-list' + row.name}>
                      <ListItemButton component="a" onClick={() => addMaterial(row)}>
                        <Typography sx={{ color: '#000', fontWeight: 'bolder' }}>{row.name}</Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}

                </List>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md >
            <TableContainer>
              <Table size="small" aria-label="a dense table" sx={{ background: 'rgba(255,255,255,0.09)' }}>
                <TableHead >
                  <TableRow sx={tableRowStyle}>
                    <TableCell sx={tableHeaderStyle} style={{ width: '10%' }}>Qty</TableCell>
                    <TableCell sx={tableHeaderStyle}>Name</TableCell>
                    {/* <TableCell sx={tableHeaderStyle}>Cost</TableCell> */}
                    <TableCell sx={tableHeaderStyleLoc}>Location / Cost</TableCell>
                    <TableCell sx={tableHeaderStyle} style={{ width: '15%' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkList.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={tableRowStyle}
                      style={{ opacity: row.check ? '0.5' : '1' }}
                    >
                      <TableCell sx={tableBodyStyle} >
                        <BtnContainer>
                          <BtnMat size="small" onClick={() => removeHandler(row.id)} aria-label="like">
                            <RemoveIcon />
                          </BtnMat>
                          <BtnMat size="small" aria-label="like">
                            {row.qty}
                          </BtnMat>
                          <BtnMat size="small" onClick={() => addHandler(row.id)} aria-label="like">
                            <AddIcon />
                          </BtnMat>
                        </BtnContainer>

                      </TableCell>
                      <TableCell sx={tableBodyStyle} > {row.name} </TableCell>

                      <TableCell sx={tableBodyStyleLoc} onClick={() => setExpanded(`panel${row.id}`)}>
                        <Box sx={showText}>
                          {row.location.map((option) => (
                            <div key={row.id + '-session-' + option} style={{ display: 'flex', justifyContent: 'center' }}>
                              {option} {getPrice(row.cost, option, row.qty)} <ExpandMoreIcon sx={{ fontSize: '25px', marginLeft: '10px', opacity: 0 }} />
                            </div>
                          ))}
                        </Box>
                      </TableCell>

                      <TableCell>
                        <BtnContainer>
                          <BtnMat size="small" aria-label="like" onClick={() => checkMaterial(row.id)}>
                            <CheckIcon />
                          </BtnMat>
                          <BtnMat size="small" aria-label="like" onClick={() => removeMaterial(row.id)}>
                            <DeleteIcon />
                          </BtnMat>
                          {/* <BtnAdd onClick={() => checkMaterial(row.id)}>
                          <CheckIcon />
                        </BtnAdd>
                        <BtnAdd onClick={() => removeMaterial(row.id)}>
                          <DeleteIcon />
                        </BtnAdd> */}
                        </BtnContainer>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ padding: '1em 0', display: 'flex', justifyContent: 'end' }}>
              <BtnClear onClick={() => setcheckList(initValue)} variant="contained">Clears All</BtnClear>
            </Box>
          </Grid>

        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Material Added to List
        </Alert>
      </Snackbar>

    </Box>
  );
}
