import styled from 'styled-components';
import Fab from '@mui/material/Fab'
import TableCell from '@mui/material/TableCell';
//35dfdf
//ffffff
//background: '#000', border: '2px solid #35dfdf', color: 'red', margin: '0 5px'
export const BtnMat = styled(Fab)`
  border: 2px solid #35dfdf;
  color: #35dfdf;
  background: #000;
  margin: 0 5px;
  &:hover{
    border: 3px solid #35dfdf;
    background: #35dfdf50;
  }
`;
export const MaterialTableCell = styled(TableCell)`
  border-bottom: transparent;
  color: #000;
  text-align:center
`;
export const BtnAdd = styled.div`  
  border: 2px solid #fff;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: #fff;
  font-size:30px;
  text-align:center;
  line-height:40px;  
  transition: all 0.3s;
  margin:0 5px;
  &:hover{
    cursor: pointer;
    border-color: #35dfdf;
    color: #35dfdf;
  }
`;
export const BtnContainer = styled.div`  
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly  
`;
