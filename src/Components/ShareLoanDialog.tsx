import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    InputLabel, MenuItem, Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../Contexts/UserContext";
import {Loan} from "../Contexts/LoanContext";

interface ShareLoanDialogProps {
    currentLoan: Loan
    handleClose: () => void
}

export const ShareLoanDialog = (props: ShareLoanDialogProps) => {
    const {currentLoan, handleClose} = props
    const {currentUser, users} = useContext(UserContext);
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    if (!currentUser) return <>No user selected!</>

    const handleChange = (e: SelectChangeEvent<string>) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`https://lending-api.azurewebsites.net/loans/${currentLoan.id}/share`,
                {
                    loan_id: currentLoan.id,
                    owner_id: currentUser.id,
                    user_id: value
                })
            if (response.status === 200) {
                setValue('')
            } else {
                setError(true)
            }
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }

    };

    return (
        <Dialog open onClose={handleClose} maxWidth="sm">
            <DialogTitle>Share loan</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose another user from the list to share this loan with.
                </DialogContentText>
                <Select
                    id="share-select"
                    value={value}
                    label="User"
                    fullWidth
                    sx={{marginTop: '12px'}}
                    onChange={(e) => handleChange(e)}
                >
                    {users.map((user) => (
                        user.id !== Number(currentUser.id) ? <MenuItem key={user.id} value={String(user.id)}>{user.username}</MenuItem> : null
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleSubmit(e)}>Share</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
