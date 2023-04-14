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
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import { Loan } from "../Contexts/LoanContext";
import { baseUrl } from "../constants";

interface ShareLoanDialogProps {
  currentLoan: Loan;
  handleClose: (success?: boolean) => void;
}

export const ShareLoanDialog = (props: ShareLoanDialogProps) => {
  const { currentLoan, handleClose } = props;
  const { currentUser, users } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!currentUser) return <>No user selected!</>;

  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/loans/${currentLoan.id}/share`,
        null,
        {
          params: {
            owner_id: currentLoan.owner_id,
            user_id: value,
          },
        }
      );
      if (response.status === 200) {
        setValue("");
        handleClose(true);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={() => handleClose()} maxWidth="sm">
      <DialogTitle>Share loan</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose another user from the list to share this loan with.
        </DialogContentText>

        <FormControl fullWidth sx={{ marginTop: "24px" }}>
          <InputLabel id="share-select-label">Recipient</InputLabel>
          <Select
            labelId="share-select-label"
            id="share-select"
            value={value}
            label="Recipient"
            onChange={(e) => handleChange(e)}
          >
            {users.map((user) =>
              user.id !== Number(currentUser.id) ? (
                <MenuItem key={user.id} value={String(user.id)}>
                  {user.username}
                </MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} onClick={(e) => handleSubmit(e)}>
          Share
        </LoadingButton>
        <Button onClick={() => handleClose()}>Cancel</Button>
      </DialogActions>
      {error && <Alert severity="error">Error sharing loan</Alert>}
    </Dialog>
  );
};
