import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";

export const StyledTextarea = styled(TextareaAutosize)(
  () => `
    width: 320px;
    max-height: 300px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    border: 2px solid #ccc;

    &:hover {
      border-color: #666262;
    }
  
    &:focus {
      border-color: #514EF3;
    }
  
    &:focus-visible {
      outline: 0;
    }
  `
);
