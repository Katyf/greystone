import { TextField } from "@mui/material";
import {FormEvent, useState} from "react";
import axios from "axios";

interface CreateUserFormProps {
    setRefreshData: (shouldRefresh: boolean) => void
}

export const CreateUserForm = (props: CreateUserFormProps) => {
    const {setRefreshData} = props
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const response = await axios.post('https://lending-api.azurewebsites.net/users',{username: value})
        if (response.status === 200) {
            setValue('')
            setRefreshData(true)
        } else {
            setError(true)
        }
    };



    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
                id=""
                label="username"
                type=""
                variant="standard"
                margin="normal"
                disabled={loading}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={error}
            />
        </form>
    );
};
