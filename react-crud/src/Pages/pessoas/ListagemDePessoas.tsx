import { useSearchParams } from "react-router-dom";

import { useEffect, useMemo } from "react";

import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { FerramentasdaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        PessoasService.getAll()
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);
                }
            });
    }, []);

    return (
        <LayoutBasePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={<FerramentasdaListagem
                mostrarInputDaBusca
                textoBotaoNovo="Nova"
                textoDaBusca={busca}
                aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })} />}
            children={undefined}
        >

        </LayoutBasePagina>
    );
}