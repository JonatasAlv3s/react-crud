import { FerramentasdaListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";


export const Dashboard = () => {

    return (
        <LayoutBasePagina
            titulo="Página Inicial"
            barraDeFerramentas={(<FerramentasdaListagem mostrarInputDaBusca textoBotaoNovo="Nova" />)}>
            Testando!!!
        </LayoutBasePagina>
    );
}