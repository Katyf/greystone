import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";

interface CreateLoanFormProps {
    currentUserId: string
    setRefreshData: (shouldRefresh: boolean) => void
}

const initialFormValue = {amount: 0, apr: 0, term: 0}

export const CreateLoanForm = (props: CreateLoanFormProps) => {
    const {currentUserId, setRefreshData} = props
    const [formValue, setFormValue] = useState(initialFormValue)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        const response = await axios.post('https://lending-api.azurewebsites.net/loans',{
            amount: formValue.amount,
            apr: formValue.apr,
            term: formValue.term,
            status: 'active',
            owner_id: currentUserId
        })
        if (response.status === 200) {
            setFormValue(initialFormValue)
            setRefreshData(true)
        } else {
            setError(true)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormValue({...formValue, [name]: value})
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                id=""
                label="Amount"
                type=""
                variant="standard"
                margin="normal"
                disabled={loading}
                value={formValue.amount}
                onChange={handleInputChange}
                error={error}
            />
            <TextField
                id=""
                label="APR"
                type=""
                variant="standard"
                margin="normal"
                disabled={loading}
                value={formValue.apr}
                onChange={handleInputChange}
                error={error}
            />
            <TextField
                id=""
                label="Term"
                type=""
                variant="standard"
                margin="normal"
                disabled={loading}
                value={formValue.term}
                onChange={handleInputChange}
                error={error}
            />
            <Button onSubmit={(e) => handleSubmit(e)} variant="contained">Create loan</Button>
        </form>
    );
};
