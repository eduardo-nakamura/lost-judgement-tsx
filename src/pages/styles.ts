import Fab from '@mui/material/Fab'
import TableCell from '@mui/material/TableCell';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from 'styled-components';


export const BtnMat = styled(Fab)`
  border: 2px solid #35dfdf !important;
  color: #35dfdf !important;
  background: #000 !important;
  margin: 0 5px;
  &:hover{
    border: 3px solid #35dfdf !important;
    background: #35dfdf50 !important;
  }
`;


export const BtnContainer = styled.div`  
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly  
`;

export const BtnClear = styled(Button)<ButtonProps>(() => ({
  color: '#000  !important',
  backgroundColor: 'rgba(53, 223, 223,0.9) !important',
  '&:hover': {
    backgroundColor: 'rgba(53, 223, 223, 1) !important',
  },
}));