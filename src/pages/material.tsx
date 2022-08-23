import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemButton, Fab, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { materialList, MaterialCheckList } from "../assets/mockup"
import { BtnMat, BtnContainer } from "./styles"

const initValue: MaterialCheckList[] = []

export default function Material() {
  const materialListInit = materialList
  const [rows, setRows] = useState(materialListInit);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [checkList, setcheckList] = useState(initValue);
  const [open, setOpen] = React.useState(false);

  const tableHeaderStyle = { color: '#35dfdf', borderBottom: '1px solid #35dfdf', textAlign: 'center', padding: '10px 0' };
  const tableBodyStyle = { color: '#fff', textAlign: 'center' }
  const tableRowStyle = { borderLeft: '5px solid #35dfdf' };

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

      // let todoLocal = JSON.parse(localStorage.getItem('checkList'))
      // setcheckList(todoLocal)
    }
  }

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    setShowSearch(true)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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


  return (
    <Box>
      <Typography sx={{ textAlign: 'center', color: '#fff', fontSize: '40px', padding: '20px 0' }}>
        Material Checklist
      </Typography>
      <Container>
        <Grid container spacing={1}>

          <Grid item xs={12} md={showSearch ? 3 : 1}>
            <Box sx={{ background: '#35dfdf', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

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
                    <TableCell sx={tableHeaderStyle}>Cost</TableCell>
                    <TableCell sx={tableHeaderStyle}>Location</TableCell>
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
                      <TableCell sx={tableBodyStyle}>

                        {row.cost.map((option, key) => (
                          <Typography key={'cost-' + key}>
                            {option.value ? option.value * row.qty : ''} {option.type !== '-' ? option.type : ''}
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell sx={tableBodyStyle}>

                        {row.location.map((option) => (
                          <Typography key={'session-' + option}>
                            {option}
                          </Typography>
                        ))}
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
          </Grid>

        </Grid>
      </Container>

    </Box>
  );
}
