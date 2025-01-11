import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as yup from 'yup';


import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { LayoutBasePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { IVFormErrors } from "../../shared/forms/IVFormErrors";

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
    idade: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().required().min(5),
    email: yup.string().required().email(),
    idade: yup.number().required(),
    cidadeId: yup.number().required(),

});

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            const parsedId = Number(id);

            if (isNaN(parsedId) || parsedId <= 0) {
                alert('ID inválido.');
                navigate('/pessoas');
                return;
            }
            setIsLoading(true);

            PessoasService.getById(parsedId)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        console.log(result);

                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nomeCompleto: '',
                idade: '',
                email: '',
                cidadeId: ''
            });
        }
    }, [id, navigate, formRef]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {

                setIsLoading(true);
                if (id === 'nova') {
                    PessoasService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndBack()) {
                                    navigate('/pessoas');
                                } else {
                                    navigate(`/pessoas/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    PessoasService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndBack()) {
                                    navigate('/pessoas');
                                }
                            }
                        });
                }

            })
            .catch((errors: yup.ValidationError) => {
                const ValidationErrors: IVFormErrors = {};
                errors.inner.forEach(error => {
                    if (!error.path) return;
                    ValidationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(ValidationErrors);
            });

    }


    const handleDelete = (id: number) => {
        if (isNaN(id) || id <= 0) {
            alert('ID inválido.');
            return;
        }

        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro deletado com sucesso!');
                        navigate('/pessoas');
                    }
                });
        }
    };


    return (
        <LayoutBasePagina
            titulo={id === 'nova' ? 'Nova Pessoa' : nome}
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Nova"
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}
                mostrarBotaoSalvarEVoltar

                aoClicarEmSalvar={save}
                aoClicarEmSalvarEVoltar={saveAndBack}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/pessoas')}
            />}
        >
            <VForm ref={formRef} onSubmit={handleSave} placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>

                <Box margin={1} display={"flex"} flexDirection={"column"} component={Paper} variant="outlined">

                    <Grid container direction={"column"} padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2} >
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Nome Completo"
                                    name='nomeCompleto'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>


                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Idade"
                                    name='idade'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Email"
                                    name='email'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label="Cidade"
                                    name='cidadeId'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

            </VForm>
        </LayoutBasePagina >
    );
}