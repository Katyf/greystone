import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { LoanContext } from "../Contexts/LoanContext";
import { UserContext } from "../Contexts/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";

interface CreateUserDialogProps {
  handleClose: (success?: boolean) => void;
}

export const CreateUserDialog = (props: CreateUserDialogProps) => {
  const { handleClose } = props;
  const [value, setValue] = useState("");
  const {
    createUser,
    usersLoading: loading,
    usersError: error,
  } = useContext(UserContext);
  const [invalid, setInvalid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newVal = e.target.value;
    newVal === "" ? setInvalid(true) : setInvalid(false);
    setValue(newVal);
  };

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (value === "") {
      setInvalid(true);
      return;
    }
    await createUser(value, handleClose);
  };

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={() => handleClose()}>
      <DialogTitle>Create user</DialogTitle>
      <DialogContent>
        <DialogContentText>Create a username</DialogContentText>
        <FormControl fullWidth sx={{ m: 1 }} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="create-user-input"
            label="Username"
            variant="filled"
            margin="normal"
            disabled={loading}
            value={value}
            onChange={(e) => handleChange(e)}
            error={invalid}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} onClick={(e) => handleSubmit(e)}>
          Create
        </LoadingButton>
        <Button onClick={() => handleClose()}>Cancel</Button>
      </DialogActions>
      {error && <Alert severity="error">Error creating user</Alert>}
    </Dialog>
  );
};
