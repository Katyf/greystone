import {
    CircularProgress,
    Dialog,
    DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../Contexts/UserContext";

interface AmortizationTableProps {
    loanId: number
    handleClose: () => void
}

interface LoanSchedule {
    month: number
    open_balance: number
    principal_payment: number
    interest_payment: number
    close_balance: number
}

export const AmortizationTable = (props: AmortizationTableProps) => {
    const {loanId, handleClose} = props;
    const {currentUser} = useContext(UserContext)
    const [error, setError] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<LoanSchedule[]>([])

    const getSchedule = async () => {
        if (currentUser) {
            try {
                const response = await axios.get(`https://lending-api.azurewebsites.net/loans/${loanId}?user_id=${currentUser.id}`)
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError(true)
                }
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        if (loanId && currentUser) {
            getSchedule().then()
        }
    }, [loanId])

    return (
        <Dialog open fullWidth maxWidth="sm" onClose={handleClose}>
            <DialogTitle>Amortization schedule</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    View the schedule for this loan
                </DialogContentText>
                {loading ? (<CircularProgress />) :
                    (
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
                    )}

            </DialogContent>
        </Dialog>
    );
};
