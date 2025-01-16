import { Box, Card, CardContent, debounce, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { FerramentasdaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { CidadesService } from "../../shared/services/cidades/CidadesService";


export const Dashboard = () => {

    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [TotalCountPessoas, setTotalCountPessoas] = useState(0);
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [TotalCountCidades, setTotalCountCidades] = useState(0);


    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);

        debounce(() => {

            PessoasService.getAll(1, '')
                .then((result) => {
                    setIsLoadingPessoas(false);
                    console.log(result);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setTotalCountPessoas(result.totalCount);
                        console.log(result);
                    }
                });
            CidadesService.getAll(1, '')
                .then((result) => {
                    setIsLoadingCidades(false);
                    console.log(result);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setTotalCountCidades(result.totalCount);
                        console.log(result);
                    }
                });
        });
    }, []);




    return (
        <LayoutBasePagina
            titulo="Página Inicial"
            barraDeFerramentas={(<FerramentasdaListagem mostrarBotaoNovo={false} />)}>
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2} >
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Pessoas
                                    </Typography>
                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                        {!isLoadingPessoas && (
                                            <Typography variant="h1">
                                                {TotalCountPessoas}
                                            </Typography>
                                        )}
                                        {isLoadingPessoas && (
                                            <Typography variant="h5">
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Cidades
                                    </Typography>
                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                        {!isLoadingCidades && (
                                            <Typography variant="h1">
                                                {TotalCountCidades}
                                            </Typography>
                                        )}
                                        {isLoadingCidades && (
                                            <Typography variant="h5">
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBasePagina>
    );
}