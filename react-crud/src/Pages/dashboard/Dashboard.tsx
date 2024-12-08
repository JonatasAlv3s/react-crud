import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";


export const Dashboard = () => {

    return (
        <LayoutBasePagina
            titulo="Página Inicial"
            barraDeFerramentas={(<FerramentasDeDetalhe mostrarBotaoSalvarEVoltar mostrarBotaoNovo />)}>
            Testando!!!
        </LayoutBasePagina>
    );
}