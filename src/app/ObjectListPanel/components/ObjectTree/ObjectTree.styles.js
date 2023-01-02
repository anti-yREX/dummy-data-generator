import { styled as muiStyled } from "@mui/system";
import styled from "styled-components";
import {
    ListItemText as MuiListItemText,
    ListItemButton as MuiListItemButton,
} from "@mui/material";

export const ListItemText = muiStyled(MuiListItemText)({
    flex: 'inherit',
});

export const ListItemButton = muiStyled(MuiListItemButton)({
    '&:hover': {
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
    }
});

export const Wrapper = styled.div``;