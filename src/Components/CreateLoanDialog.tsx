import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import {LoanContext} from "../Contexts/LoanContext";

const initialFormValue = {
    amount: {
        value: 0,
        error: false
    },
    apr: {
        value: 0,
        error: false
    },
    term: {
        value: 0,
        error: false
    }
}

interface CreateLoanDialogProps {
    handleClose: () => void
}

export const CreateLoanDialog = (props: CreateLoanDialogProps) => {
    const {handleClose} = props
    const {createLoan, loansLoading, loansError} = useContext(LoanContext);
    const [formValue, setFormValue] = useState(initialFormValue)

    const isValid = () => {
        return Object.values(formValue).every((field) => field.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (isValid()) {
            await createLoan(formValue, handleClose)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormValue({
            ...formValue,
            [name]: {
                value,
                error: value === '' || value === undefined || value === null
            }
        })
    }


    return (
        <Dialog open onClose={handleClose} maxWidth="sm">
            <DialogTitle>Add new loan</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        fullWidth
                        name="amount"
                        label="Amount"
                        variant="filled"
                        type="number"
                        margin="normal"
                        disabled={loansLoading}
                        value={formValue.amount.value}
                        error={formValue.amount.error}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name="apr"
                        label="APR"
                        variant="filled"
                        type="number"
                        margin="normal"
                        disabled={loansLoading}
                        value={formValue.apr.value}
                        error={formValue.apr.error}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        name="term"
                        label="Term"
                        variant="filled"
                        type="number"
                        margin="normal"
                        disabled={loansLoading}
                        value={formValue.term.value}
                        error={formValue.term.error}
                        onChange={handleInputChange}
                        required
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleSubmit(e)}>Add loan</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
