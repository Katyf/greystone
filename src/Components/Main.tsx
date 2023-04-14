import {
    Box,
    Container,
    Typography
} from "@mui/material";
import React from "react";
import {LoanTable} from "./LoanTable";
import {UsersSelect} from "./UsersSelect";

export const Main = () => {
    return (
        <Container className="container" maxWidth="xl" sx={{padding: '24px'}}>
            <Typography variant="subtitle1" sx={{paddingTop: '12px', paddingBottom: '12px'}}>
                An app where you view and create users, view and create user's loans, see the amortization terms for those loans, and share with other users.
            </Typography>
            <Box sx={{marginTop: '24px'}}>
               <UsersSelect/>
                <LoanTable />
            </Box>
        </Container>
    );
};
