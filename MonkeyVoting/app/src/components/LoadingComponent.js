import React from "react";
import {
  CircularProgress,
  Container,
  Typography,
  Box
} from "@material-ui/core";

export default ({ drizzle, drizzleState }) => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" m={2}>
        <Typography variant="h2">Monkey Voting</Typography>
      </Box>
      <Box textAlign="center" m={2}>
        <Typography variant="h6">Loading</Typography>
      </Box>
      <Box textAlign="center" m={2}>
        <CircularProgress />
      </Box>
    </Container>
  );
};
