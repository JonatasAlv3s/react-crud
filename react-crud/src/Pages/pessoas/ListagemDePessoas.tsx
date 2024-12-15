import { useSearchParams } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";

import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { FerramentasdaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";


export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(3000, false);

    const [totalCount, setTotalCount] = useState<number>(0);
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        debounce(() => {

            PessoasService.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setTotalCount((prevCount) => prevCount + 1);
                        console.log(result);
                        console.log(totalCount);
                    }
                });
        });
    }, [busca, debounce, totalCount]);

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