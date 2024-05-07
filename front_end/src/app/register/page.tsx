'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Input, InputLabel } from '@mui/material';
import { AuthContext } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';


export default function Register() {
    const { signUp } = React.useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function handleSignUp(data: any) {

        await signUp(data)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error)
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


    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
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
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}