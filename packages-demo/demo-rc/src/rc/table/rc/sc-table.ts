import styled from 'styled-components';

import {
  COLOR_TABLE,
  COLOR_TABLE_DARK
} from '../../../const';

export default styled.table`
  display: table;
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  color: inherit;
  word-wrap: break-word;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  tr {
    background-color: ${COLOR_TABLE.BGC_TD};
    
    .theme-dark & {
      background-color: ${COLOR_TABLE_DARK.BGC_TD};
    }
  }
  
  th {
    font-weight: 600;
    
    &[colspan] {
      text-align: center;
    }
  }
  
  thead {
    tr {
      background-color: ${COLOR_TABLE.BGC_TH};
      
      .theme-dark & {
        background-color: ${COLOR_TABLE_DARK.BGC_TH};
      }
    }
  }
  
  th,
  td {
    padding: 8px 12px;
    border-bottom: 1px solid ${COLOR_TABLE.BDC};
    font-size: 0.95em;
    color: inherit;
    text-align: left;
    
    &[align="right"] {
      text-align: right;
    }
    
    &[align="center"] {
      text-align: center;
    }
    
    .theme-dark & {
      border-color: ${COLOR_TABLE_DARK.BDC};
    }
  }
`;
