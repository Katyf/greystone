import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

interface LoanScheduleTableProps {
    loanId: number
}

interface LoanSchedule {
    month: number
    open_balance: number
    principal_payment: number
    interest_payment: number
    close_balance: number
}

export const LoanScheduleTable = (props: LoanScheduleTableProps) => {
    const {loanId} = props;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<LoanSchedule[]>([])

    useEffect(() => {
        setLoading(true);
        const url = `https://cors-anywhere.herokuapp.com/https://lending-api.azurewebsites.net/loans${loanId}`;
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((e) => console.log(e))
    }, [loanId])

    if (loading) return <div>Loading... </div>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="loans table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Month</TableCell>
                        <TableCell align="right">Open Balance</TableCell>
                        <TableCell align="right">Principal Payment</TableCell>
                        <TableCell align="right">Interest Payment</TableCell>
                        <TableCell align="right">Close Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.month}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.month}</TableCell>
                            <TableCell align="right">{row.open_balance}</TableCell>
                            <TableCell align="right">{row.principal_payment}</TableCell>
                            <TableCell align="right">{row.interest_payment}</TableCell>
                            <TableCell align="right">{row.close_balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
