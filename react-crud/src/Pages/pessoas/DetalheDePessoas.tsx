import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { LinearProgress } from "@mui/material";



export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        console.log(result);
                    }
                });
        }
    }, [id, navigate]);

    const handleSave = () => {
        console.log('save');
    }

    const handleDelete = (id: number) => {

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

    }

    return (
        <LayoutBasePagina
            titulo={id === 'nova' ? 'Nova Pessoa' : nome}
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Nova"
                mostrarBotaoNovo={id !== 'nova'}
                mostrarBotaoApagar={id !== 'nova'}
                mostrarBotaoSalvarEVoltar

                aoClicarEmSalvar={handleSave}
                aoClicarEmSalvarEVoltar={handleSave}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                aoClicarEmVoltar={() => navigate('/pessoas')}
            />}
        >
            {isLoading && (
                <LinearProgress variant="indeterminate" />
            )}

            <p>Detalhe de Pessoas {id}</p>
        </LayoutBasePagina>
    );
}