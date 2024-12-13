import { useSearchParams } from "react-router-dom";

import { useMemo } from "react";

import { FerramentasdaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";


export const ListagemDeCidade: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    return (
        <LayoutBasePagina
            titulo="Listagem de Cidade"
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