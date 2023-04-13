import {
    Box,
    CircularProgress, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip,
    Typography,
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ShareLoanDialog} from "./ShareLoanDialog";

interface LoanTableProps {
    userId?: string
}

export interface Loan {
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
    const [currentLoan, setCurrentLoan] = useState<Loan>();

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

    const handleShare = (loan: Loan) => {
        setCurrentLoan(loan)
    }

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
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="loans table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">APR</TableCell>
                            <TableCell align="center">Term</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Owner</TableCell>
                            <TableCell align="center">{' '}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response?.data?.length > 0 && response?.data.map((row: Loan) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="center">{row.apr}</TableCell>
                                <TableCell align="center">{row.term}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">{row.owner_id}</TableCell>
                                <TableCell align="right" sx={{width: '30px'}}>
                                    <Tooltip title="Share">
                                        <IconButton aria-label="share" onClick={() => handleShare(row)}>
                                            <ShareIcon fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {response?.data?.length === 0 && (
                <Box sx={{padding: '24px', textAlign: 'center'}}>
                    <Typography>This user doesn't have any loans yet</Typography>
                </Box>
            )}
            {currentLoan && (
                <ShareLoanDialog users={[]} currentUserId={userId} currentLoan={currentLoan} handleClose={() => setCurrentLoan(undefined)} />
            )}

        </>
    );
};
