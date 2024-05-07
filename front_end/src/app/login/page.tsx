'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { Input, CssBaseline, InputLabel, Link } from '@mui/material';


// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

interface DataInput {
  username: string,
  password: string
}

export default function Login() {

  const { signIn } = React.useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSignIn(data: any) {
    // setLoading(true);
    await signIn(data)
      .then((res) => {
        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        if (error) {
          if (typeof error.error === "string") {
            // setMessage(err.error);
            // setShowAlert(true);
          } else {
            // setMessage("Ocorreu um erro, tente novamente mais tarde");
            // setShowAlert(true);
          }
        }
      });
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
          <InputLabel htmlFor="username" >Username</InputLabel>
          <Input
            required
            fullWidth
            id="username"
            autoComplete="username"
            autoFocus
            {...register("username", {
              required: "Campo de username é obrigatório",
            })}
          />
          <InputLabel htmlFor="password" >Password</InputLabel>
          <Input
            required
            type="password"
            id="password"
            fullWidth
            autoComplete="current-password"
            {...register("password", {
              required: "Campo de password é obrigatório",
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}