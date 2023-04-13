import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

interface LoanTableProps {
    userId?: number
}

interface Loan {
    amount: number
    apr: number
    term: number
    status:	string
    owner_id: number
    id: number
}

export const LoanTable = (props: LoanTableProps) => {
    const {userId} = props;

    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(true);

    const makeRequest = async () => {
        try {
            const result = await axios.get(`https://lending-api.azurewebsites.net/users/${userId}/loans`);
            setResponse(result);
        } catch(error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (refreshData && userId) {
            makeRequest().then()
            setRefreshData(false)
        }
    }, [userId, refreshData]);

    if (!userId) {
        return <div>Select a user from the dropdown list to view their loans</div>
    }
    if (loading) return <CircularProgress />
    if (error) return <div>There was an error :/ </div>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="loans table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">APR</TableCell>
                        <TableCell align="right">Term</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Owner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {response?.data?.map((row: Loan) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.apr}</TableCell>
                            <TableCell align="right">{row.term}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.owner_id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
