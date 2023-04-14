import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CreateUserDialog } from "./CreateUserDialog";
import { UserContext } from "../Contexts/UserContext";

export const UsersSelect = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);

  const {
    users,
    getUsers,
    currentUser,
    setCurrentUser,
    usersLoading,
    usersError,
  } = useContext(UserContext);

  useEffect(() => {
    getUsers().then();
  }, []);

  const handleUserChange = (e: SelectChangeEvent<number>) => {
    const selectedUser = users.find(
      (user) => user.id === Number(e.target.value)
    );
    if (selectedUser) setCurrentUser(selectedUser);
  };

  const handleAddUserDialog = () => {
    setOpenNewUserDialog(true);
  };
  const handleCloseAddUserDialog = (success?: boolean) => {
    setOpenNewUserDialog(false);
    if (success) setShowSuccess(true);
  };

  if (usersLoading)
    return (
      <Container
        className="container"
        maxWidth="xl"
        sx={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  if (usersError) return <div>Error fetching users</div>;

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={currentUser ? currentUser.id : ""}
          label="User"
          sx={{ background: "white" }}
          onChange={(e) => handleUserChange(e)}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={String(user.id)}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleAddUserDialog}
        sx={{ marginTop: "12px", marginBottom: "12px" }}
      >
        Add new user
      </Button>
      {openNewUserDialog && (
        <CreateUserDialog handleClose={handleCloseAddUserDialog} />
      )}
      {showSuccess && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            User successfully created!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
