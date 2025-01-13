import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as yup from 'yup';


import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField, VForm, useVForm } from "../../shared/forms";
import { LayoutBasePagina } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/cidades/CidadesService";
import { IVFormErrors } from "../../shared/forms/IVFormErrors";

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(5),

});

export const DetalheDeCidades: React.FC = () => {

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
                navigate('/cidades');
                return;
            }
            setIsLoading(true);

            CidadesService.getById(parsedId)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/cidades');
                    } else {
                        setNome(result.nome);
                        console.log(result);

                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nome: '',
            });
        }
    }, [id, navigate, formRef]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.
            validate(dados, { abortEarly: false })
            .then((dadosValidados) => {

                setIsLoading(true);
                if (id === 'nova') {
                    CidadesService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndBack()) {
                                    navigate('/cidades');
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    CidadesService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndBack()) {
                                    navigate('/cidades');
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
            CidadesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro deletado com sucesso!');
                        navigate('/cidades');
                    }
                });
        }
    };


    return (
        <LayoutBasePagina
            titulo={id === 'nova' ? 'Nova Cidade' : nome}
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Nova"
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}
                mostrarBotaoSalvarEVoltar

                aoClicarEmSalvar={save}
                aoClicarEmSalvarEVoltar={saveAndBack}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/cidades')}
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
                                    label="Nome"
                                    name='nome'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

            </VForm>
        </LayoutBasePagina >
    );
}