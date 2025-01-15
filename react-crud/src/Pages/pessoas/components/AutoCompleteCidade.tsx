import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { CidadesService } from "../../../shared/services/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";



type TAutoCompleteOption = {
    id: number;
    label: string;
}
interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
    const { registerField, fieldName, defaultValue, error, clearError } = useField('cidadeId');
    const { debounce } = useDebounce();
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });

    }, [registerField, fieldName, setSelectedId, selectedId]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {

            CidadesService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        /*alert(result.message);*/
                    } else {

                        setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
                    }
                });
        });
    }, [debounce, busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedId) return null;


        return selectedOption;

    }, [selectedId, opcoes]);


    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem Opções"
            loadingText="Carregando..."

            disablePortal

            options={opcoes}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id || undefined); setBusca(''); clearError() }}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            renderInput={(params) => (
                <TextField
                    {...params}

                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            )}

        />
    );
}