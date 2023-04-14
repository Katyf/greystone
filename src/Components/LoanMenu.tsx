import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {IconButton, ListItemIcon, Tooltip} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShareIcon from '@mui/icons-material/Share';

interface LoanMenuProps {
    handleShare: any
    handleViewAmortization: any
}
export const LoanMenu = (props: LoanMenuProps) => {
    const {handleShare, handleViewAmortization} = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Options">
            <IconButton
                onClick={handleClick}
                id="options-menu-button"
                aria-controls={open ? 'options-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreVertIcon fontSize="small"/>
            </IconButton>
            </Tooltip>
            <Menu
                id="options-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'options-menu-button',
                }}
            >
                <MenuItem onClick={handleShare}>
                    <ListItemIcon>
                        <ShareIcon/>
                    </ListItemIcon>
                    Share
                </MenuItem>
                <MenuItem onClick={handleViewAmortization}>
                    <ListItemIcon>
                        <ScheduleIcon/>
                    </ListItemIcon>
                    View Amortization
                </MenuItem>
            </Menu>
        </div>
    );
}