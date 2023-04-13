import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {CreateUserDialog} from "./Components/CreateUserDialog";
import {LoanTable} from "./Components/LoanTable";
import {UserContext} from "./Contexts/UserContext";

export const Home = () => {
    const [refreshData, setRefreshData] = useState(true);
    const [openNewUserDialog, setOpenNewUserDialog] = useState(false);

    const {users, getUsers, currentUser, setCurrentUser, usersLoading, usersError} = useContext(UserContext);

    useEffect(() => {
        if (refreshData) {
            getUsers().then();
        }
    }, [refreshData]);

    const handleUserChange = (e: SelectChangeEvent<number>) => {
        const selectedUser = users.find((user) => user.id === Number(e.target.value))
        if (selectedUser) setCurrentUser(selectedUser)
    }

    const handleAddUserDialog = () => {
        setOpenNewUserDialog(true)
    }
    const handleCloseAddUserDialog = () => {
        setOpenNewUserDialog(false)
    }

    if (usersLoading) return <Container className="container" maxWidth="xl" sx={{padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Container>
    if (usersError) return <div>error :/</div>
    return (
        <Container className="container" maxWidth="xl" sx={{padding: '24px'}}>
            <Typography variant="h5" component="h1">Amortization App</Typography>
            <Divider/>
            <Typography variant="subtitle1" sx={{paddingTop: '12px', paddingBottom: '12px'}}>An app where you view and create users, view and create user's loans, see the amortization terms for those loans, and share with other users.</Typography>
            <Box sx={{marginTop: '24px'}}>
                <FormControl fullWidth>
                    <InputLabel id="user-select-label">User</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"
                        value={currentUser ? currentUser.id : ''}
                        label="User"
                        onChange={(e) => handleUserChange(e)}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={String(user.id)}>{user.username}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={handleAddUserDialog} sx={{marginTop: '12px', marginBottom: '12px'}}>Add new user</Button>
                {openNewUserDialog && (
                    <CreateUserDialog setRefreshData={setRefreshData} handleClose={handleCloseAddUserDialog}/>
                )}
                <LoanTable />
            </Box>
        </Container>
    );
};
