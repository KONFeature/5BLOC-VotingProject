import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Card,
  CardContent
} from "@material-ui/core";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <Container maxWidth="sm">

      {/* ===== Title ===== */}
      <Box textAlign="center" m={2}>
        <Typography variant="h2">Monkey Voting</Typography>
      </Box>

      {/* ===== Account ===== */}
      <Box m={2}>
        <Card>
          <CardContent>
            <Typography variant="h5">Your account</Typography>
            <AccountData
              drizzle={drizzle}
              drizzleState={drizzleState}
              accountIndex={0}
              units="ether"
              precision={3} />
          </CardContent>
        </Card>
      </Box>

      {/* ===== Candidates list ===== */}
      <Box m={2}>
        <Card>
          <CardContent>

            <Typography variant="h5">Election leader</Typography>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="MonkeyElection"
              method="chairperson" />

            <Typography variant="h5">Candidates</Typography>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="MonkeyElection"
              method="candidates"
              methodArgs={[1]} />

          </CardContent>
        </Card>
      </Box>

    </Container>
  );
};
