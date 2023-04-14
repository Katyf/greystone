import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import { baseUrl } from "../constants";
import { Loan } from "../Contexts/LoanContext";

interface AmortizationTableProps {
  currentLoan: Loan;
  handleClose: () => void;
}

interface LoanSchedule {
  month: number;
  open_balance: number;
  principal_payment: number;
  interest_payment: number;
  close_balance: number;
}

export const AmortizationTable = (props: AmortizationTableProps) => {
  const { currentLoan, handleClose } = props;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LoanSchedule[]>([]);

  const getSchedule = async () => {
    if (currentLoan) {
      try {
        const response = await axios.get(
          `${baseUrl}/loans/${currentLoan.id}?user_id=${currentLoan.owner_id}`
        );
        if (response.status === 200) {
          setData(response.data);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    if (currentLoan) {
      getSchedule().then();
    }
  }, [currentLoan]);

  return (
    <Dialog open fullWidth maxWidth="lg" onClose={handleClose}>
      <DialogTitle>
        Amortization schedule
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#2b2b2b",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "24px" }}>
          View the schedule for this loan
        </DialogContentText>
        {loading ? (
          <CircularProgress />
        ) : (
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.month}</TableCell>
                    <TableCell align="right">
                      ${row.open_balance.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${row.principal_payment.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${row.interest_payment.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ${row.close_balance.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!data && !loading && error && (
          <>
            There was an error fetching the amortization schedule for this loan.
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
