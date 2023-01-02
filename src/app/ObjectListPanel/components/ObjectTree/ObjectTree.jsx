import React from 'react';
import { Icon, List } from "@mui/material";
import { ListItemText, ListItemButton } from './ObjectTree.styles';
import Types from '../../../../constants/PropertyTypes.enum';
import { ArrowDropDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedKey } from '../../../../services/reduxStore/SelectedKeyReducer';

const LeafTypeItem = (props) => {
    const { keyName } = props;

    const dispatch = useDispatch();

    const selectedKey = useSelector(({ selectedKey }) => (selectedKey));
    const selected = selectedKey.path.includes(keyName);

    const onClickHandler = () => {
        dispatch(
            setSelectedKey({
                path: props.path,
                keyName,
            })
        );
    }

    return (
        <ListItemButton
            key={keyName}
            sx={{
                backgroundColor: selected && 'rgb(0, 0, 0, 0.1)',
            }}
            onClick={() => onClickHandler()}
        >
            <ListItemText
                sx={{ marginLeft: '16px' }}
                primary={keyName}
            />
        </ListItemButton>
    )
}

const NodeTypeItem = (props) => {
    const {
        keyName,
        children,
    } = props;

    const dispatch = useDispatch();

    const selectedKey = useSelector(({ selectedKey }) => (selectedKey));
    const expanded = selectedKey.path.includes(keyName);

    const onClickHandler = () => {
        dispatch(setSelectedKey({
            path: props.path,
            keyName,
        }));
    }


    return (
        <>
            <ListItemButton
                key={keyName}
                sx={{
                    backgroundColor: expanded && 'rgb(0, 0, 0, 0.1)',
                }}
                onClick={() => onClickHandler()}
            >
                <Icon
                    sx={{
                        margin: '0 8px 0 -14px',
                        transform: expanded ? '' : 'rotate(-90deg)',
                    }}
                >
                    <ArrowDropDown />
                </Icon>
                <ListItemText
                    primary={keyName}
                />
            </ListItemButton>
            <List
                sx={{
                    marginLeft: '24px',
                    padding: 0,
                    borderLeft: '2px solid gray',
                    borderRadius: '0 0 0 4px',
                    display: expanded ? 'inherit' : 'none',
                }}
            >
                {Object.keys(children).map((current) => (
                    <ObjectTree
                        key={current}
                        keyName={current}
                        {...children[current]}
                    />
                ))}
            </List>
        </>
    )
}

const ObjectTree = (props) => {
    const {
        type,
    } = props;

    if (!(type === Types.object || type === Types.array)) {
        return (
            <LeafTypeItem
                {...props}
            />
        )
    }

    return (
        <NodeTypeItem
            {...props}
        />
    );
}

export default ObjectTree;
