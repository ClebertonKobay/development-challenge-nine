import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { AuthContext } from "@/context/AuthContext";



export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false}>
        <Box sx={{ bgcolor: '#fff', height: 'calc(100vh - 70px)', textAlign: "center", alignItems: "center", justifyItems: "center" }}>
          <Typography marginTop="100px" component="h1" variant="h2">
            Welcome to the MedCloud patient registration system
          </Typography>
          <Typography component="h1" variant="h4">
            Please log in to continue
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
