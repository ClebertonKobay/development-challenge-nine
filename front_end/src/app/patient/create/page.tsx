'use client'
import AddressInterface from "@/interfaces/addressInterface";
import PatientInterface from "@/interfaces/patientInterface";
import { api } from "@/services/api";
import {
    Box,
    InputLabel,
    Typography,
    Input,
    Button,
    Grid,
    Autocomplete,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Create() {
    const [districts, setDistricts] = useState<AddressInterface[]>([])
    const [cities, setCities] = useState<AddressInterface[]>([])
    const [states, setStates] = useState<AddressInterface[]>([])
    const [countries, setCountries] = useState<AddressInterface[]>([])
    const [districtId, setDistrictId] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCountry = async () => {
        await api.get('http://localhost:3001/address/countries').then((res) => {
            setCountries(res.data)
        })
    }
    const handleState = async (event: React.SyntheticEvent, value: AddressInterface | null) => {
        if (value === null) {
            setStates([])
            setCities([])
            setDistricts([])
            return;
        }
        await api.get(`http://localhost:3001/address/states/${value.id}`).then((res) => {
            setStates(res.data)
        })
    }
    const handleCity = async (event: React.SyntheticEvent, value: AddressInterface | null) => {
        if (value === null) {
            setCities([])
            setDistricts([])
            return
        }
        await api.get(`http://localhost:3001/address/cities/${value.id}`).then((res) => {
            setCities(res.data)
        })
    }
    const handleDistrict = async (event: React.SyntheticEvent, value: AddressInterface | null) => {
        if (value === null) {
            setDistricts([])
            return;
        }
        await api.get(`http://localhost:3001/address/districts/${value.id}`).then((res) => {
            setDistricts(res.data)
        })
    }

    useEffect(() => {
        handleCountry()
    }, [])

    const handlePatient = async (data: any) => {
        data.districtId = districtId;
        await api.post(`http://localhost:3001/patient`, data).then((res) => {
          
        })
    }
    return (
        <>
            <Box sx={{
                bgcolor: '#fff', height: 'calc(100vh - 80px)', textAlign: "center", alignItems: "center", justifyItems: "center", display: "flex",
                flexDirection: "column"
            }}>
                <Typography component="h1" variant="h4">
                    Register a patient
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handlePatient)} noValidate
                    sx={{ width: '50%', mt: 1, alignItems: "center", justifyItems: "center" }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="username" >Name</InputLabel>
                            <Input
                                required
                                fullWidth
                                id="name"
                                autoComplete="name"
                                autoFocus
                                {...register("name", {
                                    required: "Campo de name é obrigatório",
                                })}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel htmlFor="birthDay" >Birth Day</InputLabel>
                            <Input
                                required
                                id="birthDay"
                                fullWidth
                                type="date"
                                {...register("birthDay", {
                                    required: "Campo de birth day é obrigatório",
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="email" >Email</InputLabel>
                            <Input
                                required
                                id="email"
                                fullWidth
                                {...register("email", {
                                    required: "Campo de email é obrigatório",
                                })}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <InputLabel htmlFor="address" >Adress(street)</InputLabel>
                            <Input
                                required
                                id="address"
                                fullWidth
                                {...register("address", {
                                    required: "Campo de address é obrigatório",
                                })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel htmlFor="addressNumber" >Adress Number</InputLabel>
                            <Input
                                required
                                id="addressNumber"
                                fullWidth
                                {...register("addressNumber", {
                                    required: "Campo de email é obrigatório",
                                })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                id="country"
                                options={countries}
                                sx={{ width: 200 }}
                                {...register("country")}
                                onChange={handleState}
                                getOptionLabel={(option) => option.name || ""}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                id="state"
                                options={states}
                                sx={{ width: 200 }}
                                {...register("state")}
                                onChange={handleCity}
                                getOptionLabel={(option) => option.name || ""}
                                renderInput={(params) => <TextField {...params} label="State" />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                id="city"
                                options={cities}
                                sx={{ width: 200 }}
                                {...register("city")}
                                onChange={handleDistrict}
                                getOptionLabel={(option) => option.name || ""}
                                renderInput={(params) => <TextField {...params} label="City" />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                disablePortal
                                id="district"
                                options={districts}
                                sx={{ width: 200 }}
                                {...register("districtId")}
                                getOptionLabel={(option) => option.name || ""}
                                onChange={(event, value) => {
                                    const id = value === null ? "" : value.id
                                    setDistrictId(id);
                                }}
                                renderInput={(params) => <TextField {...params} label="District" />}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>

    )
}