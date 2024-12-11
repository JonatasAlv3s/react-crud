import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material";
import { Environment } from "../../environments";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string,
    mostrarInputDaBusca?: boolean,
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
}
interface IFerramentasDaListagemProps {
    textoBotaoNovo?: string,
    mostrarBotaoNovo?: boolean,
    aoClicarEmNovo?: () => void;
}

export const FerramentasdaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    mostrarInputDaBusca = false,
    aoMudarTextoDeBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'novo',
    mostrarBotaoNovo = true,
}) => {
    const Theme = useTheme();

    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={Theme.spacing(5)}
            component={Paper}
        >

            {mostrarInputDaBusca && (
                <TextField
                    size="small"
                    value={textoDaBusca}
                    placeholder={Environment.INPUT_DE_BUSCA}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Icon>search</Icon>
                            </InputAdornment>
                        )
                    }}
                />
            )}
            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        onClick={aoClicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>

        </Box>

    );
}