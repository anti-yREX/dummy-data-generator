import { styled as muiStyled } from "@mui/system";
import styled from "styled-components";
import { TextField as TextFieldComponent } from "../../../../components/TextField";
import { ListItemText as MuiListItemText } from "@mui/material";

export const TextField = muiStyled(TextFieldComponent)({
    margin: '6px',
    width: 'calc(100% - 12px)',
});

export const ListItemText = muiStyled(MuiListItemText)({
    flex: 'inherit',
});

export const Wrapper = styled.div``;