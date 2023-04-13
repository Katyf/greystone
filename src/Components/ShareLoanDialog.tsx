import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {Loan} from "./LoanTable";

interface ShareLoanDialogProps {
    users: any[]
    currentUserId: string
    currentLoan: Loan
    handleClose: () => void
}

export const ShareLoanDialog = (props: ShareLoanDialogProps) => {
    const {users, currentLoan, currentUserId, handleClose} = props
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: any, el: any) => {
        setValue(el.props.value)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setLoading(true)
        const response = await axios.post(`https://lending-api.azurewebsites.net/loans/${currentLoan.id}/share`,
            {
                loan_id: currentLoan.id,
                owner_id: currentUserId,
                user_id: value
            })
        if (response.status === 200) {
            setValue('')
        } else {
            setError(true)
        }
    };



    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Share loan</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose another user from the list to share this loan with.
                </DialogContentText>
                <InputLabel id="user-select-label">User</InputLabel>
                <Select
                    labelId="share-select-label"
                    id="share-select"
                    value={value}
                    label="User"
                    onChange={(e: any, el: any) => handleChange(e, el)}
                >
                    {users.map((user: any) => (
                        user.id !== Number(currentUserId) ? <MenuItem key={user.id} value={String(user.id)}>{user.username}</MenuItem> : <></>
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
