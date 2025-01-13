import { Environment } from "../../environments";
import { Api } from "../api/axios-config";

export interface IListagemCidade {
    id: number;
    nome: string;
}

export interface IDetalheCidade {
    id: number;
    nome: string;

}

type TCidadesComTotalCount = {
    data: IListagemCidade[],
    totalCount: number
}


const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
    try {

        const urlRelativa = `/cidades?_page=${page}&_per_page=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        const { data } = await Api.get(urlRelativa);


        if (data) {

            return {
                data: data.data,
                totalCount: data.pages,
            } as TCidadesComTotalCount;
        }
        return new Error('Erro ao listar os registros.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {

    if (!id || isNaN(id) || id <= 0) {
        return new Error('ID inválido.');
    }

    try {

        const { data } = await Api.get(`/Cidades/${id}`);

        if (data) {
            return data;
        }
        return new Error('Erro ao consultar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
    try {

        console.log('Dados enviados:', dados);

        const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

        if (data && data.id) {
            return data.id;
        }
        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
    try {

        await Api.put(`/cidades/${id}`, dados);
        return;
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/cidades/${id}`);
        return;
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
};


export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};