import { styled as muiStyled } from "@mui/system";
import styled from "styled-components";
import {
    ListItemText as MuiListItemText,
    ListItemButton as MuiListItemButton,
} from "@mui/material";
import { TextField as TextFieldComponent } from '../../../../components/TextField';

export const ListItemText = muiStyled(MuiListItemText)({
    flex: 'inherit',
});

export const ListItemButton = muiStyled(MuiListItemButton)({
    '&:hover': {
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
    }
});

export const TextField = muiStyled(TextFieldComponent)({
    width: '100%',
});

export const Wrapper = styled.div``;