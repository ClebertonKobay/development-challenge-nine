'use client'
import { api } from '@/services/api';
import { Box, Button, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useQuery, useMutation, QueryClient } from 'react-query';
import dayjs from 'dayjs';

export default function Patient() {

    const queryClient = new QueryClient();
    const { data, isLoading, refetch } = useQuery('patients', () => {
        return api.get('http://localhost:3001/patient').then((res) => {
            return res.data
        })
    })

    const mutation = useMutation({
        mutationFn: async (id: string) => {

            return api.delete(`http://localhost:3001/patient/${id}`).then(res => {
                return res
            })
        },
        onSuccess: (data) => { 
            refetch()
         }
    });

    const columns: GridColDef[] = [
        { field: 'name', headerName: "Patient's name", width: 300 },
        { field: 'email', headerName: 'Email', width: 180 },
        {
            field: 'birthDay',
            headerName: 'Birth date',
            valueGetter: (data) => {
                return dayjs(data).format('DD/MM/YYYY')
            },
            width: 130,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 200,
        },
        {
            field: 'addressNumber',
            headerName: 'Adress Number',
            type: 'string',
            width: 130,
        },
        {
            field: 'district',
            headerName: 'District',
            width: 130,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 130,
        },
        {
            field: 'state',
            headerName: 'State',
            width: 130,
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 130,
        }, {
            field: 'id',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => {
                const urlEdit = `/patient/edit/${params.value}`
                return (<Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={() => mutation.mutate(params.value)}
                        >
                            Delete
                        </Button >
                    </Grid>
                    <Grid item xs={6}>
                        <Link
                            href={urlEdit}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ marginLeft: 16 }}
                            >
                                Edit
                            </Button >
                        </Link >
                    </Grid>
                </Grid>
                )
            }
        }
    ];

    return (
        <>
            <Link href="/patient/create" variant="body2"
                style={{
                    textDecoration: 'none', backgroundColor: '#03ad36', color: '#fff',
                    padding: "10px", fontSize: "16px", borderRadius: "10px",
                    position: "absolute", top: "90px"
                }}
            >
                Create a patient
            </Link>
            <Box sx={{ bgcolor: '#fff', height: 'calc(100vh - 160px)', textAlign: "center", alignItems: "center", justifyItems: "center", marginTop: "70px" }}>
                {!isLoading &&
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                }
            </Box>
        </>

    )
}