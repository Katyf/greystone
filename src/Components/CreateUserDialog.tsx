import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, InputLabel,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";

interface CreateUserDialogProps {
    handleClose: () => void
    setRefreshData: (shouldRefresh: boolean) => void
}

export const CreateUserDialog = (props: CreateUserDialogProps) => {
    const {handleClose, setRefreshData} = props
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        const response = await axios.post('https://lending-api.azurewebsites.net/users', {username: value})
        if (response.status === 200) {
            setValue('')
            setRefreshData(true)
        } else {
            setError(true)
        }
    };


    return (
        <Dialog open fullWidth maxWidth="sm" onClose={handleClose}>
            <DialogTitle>Create user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a username
                </DialogContentText>
                <FormControl fullWidth sx={{ m: 1 }} onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        id="create-user-input"
                        label="Username"
                        variant="filled"
                        margin="normal"
                        disabled={loading}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        error={error}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleSubmit(e)}>Create</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}