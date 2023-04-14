import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip,
    Typography,
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {ShareLoanDialog} from "./ShareLoanDialog";
import {UserContext} from "../Contexts/UserContext";
import {Loan, LoanContext} from "../Contexts/LoanContext";
import {CreateLoanDialog} from "./CreateLoanDialog";
import {LoanMenu} from "./LoanMenu";
import {AmortizationTable} from "./AmortizationTable";

export const LoanTable = () => {
    const [openNewLoanDialog, setOpenNewLoanDialog] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [currentLoan, setCurrentLoan] = useState<Loan>()
    const [currentAction, setCurrentAction] = useState('')
    const { currentUser, users } = useContext(UserContext);
    const { loans, loansLoading, loansError, getLoans } = useContext(LoanContext);

    useEffect(() => {
        if (currentUser?.id) {
            getLoans().then();
        }
    }, [currentUser]);

    const handleShare = (loan: Loan) => {
        setCurrentLoan(loan)
        setCurrentAction('share')
    }
    const handleCloseShareDialog = (success?: boolean) => {
        setCurrentLoan(undefined)
        if (success) {
            setSuccessMessage('Loan successfully shared!')
            setShowSuccess(success)
        }
    }

    const handleViewAmortization = (loan: Loan) => {
        setCurrentLoan(loan)
        setCurrentAction('view')
    }

    const handleAddLoanDialog = () => {
        setOpenNewLoanDialog(true)
    }
    const handleCloseAddLoanDialog = (success?: boolean) => {
        setOpenNewLoanDialog(false)
        if (success) {
            setSuccessMessage('Loan successfully created!')
            setShowSuccess(success)
        }
    }

    const getOwnerName = (userId: number) => {
        const owner = users.find((user) => user.id === userId)
        return owner ? owner.username : userId
    }

    if (!currentUser) {
        return <Typography align="center">Select a user from the dropdown list to view their loans</Typography>
    }
    if (loansLoading) return <CircularProgress />
    if (loansError) return <div>There was an error :/ </div>

    return (
            <Box sx={{paddingTop: '24px'}}>
                <Typography variant="subtitle2">{currentUser.username}'s Loans</Typography>
                <Divider/>
            <TableContainer component={Paper} sx={{marginTop: '24px'}}>
                <Table sx={{ minWidth: 650 }} aria-label="loans table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">APR</TableCell>
                            <TableCell align="center">Term</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Owner</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.length > 0 && loans.map((row: Loan) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">${row.amount}</TableCell>
                                <TableCell align="center">{row.apr}%</TableCell>
                                <TableCell align="center">{row.term}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">{getOwnerName(row.owner_id)}</TableCell>
                                <TableCell align="right" sx={{width: '30px'}}>
                                    <LoanMenu
                                        handleShare={ () => handleShare(row)}
                                        handleViewAmortization={() => handleViewAmortization(row)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loans.length === 0 && (
                <Box sx={{padding: '24px', textAlign: 'center'}}>
                    <Typography>This user doesn't have any loans yet</Typography>
                </Box>
            )}
            {currentLoan && currentAction === 'share' && (
                <ShareLoanDialog
                    currentLoan={currentLoan}
                    handleClose={handleCloseShareDialog}
                />
            )}
            {currentLoan && currentAction === 'view' && (
                    <AmortizationTable
                        loanId={currentLoan.id}
                        handleClose={() => setCurrentLoan(undefined)}
                    />
                    )}

            <Button variant="contained" onClick={handleAddLoanDialog} sx={{marginTop: '12px', marginBottom: '12px'}}>Add new loan</Button>
                {openNewLoanDialog && (
                    <CreateLoanDialog handleClose={handleCloseAddLoanDialog} />
                )}
                {showSuccess && (
                    <Snackbar open autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            {successMessage}
                        </Alert>
                    </Snackbar>
                )}

            </Box>
    );
};
