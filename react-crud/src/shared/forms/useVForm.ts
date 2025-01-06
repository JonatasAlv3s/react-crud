import { useCallback, useRef } from "react";

import { FormHandles } from "@unform/core";



export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const isSaveAndNew = useRef(false);
    const isSaveAndBack = useRef(false);

    const handleSave = useCallback(() => {
        isSaveAndNew.current = false;
        isSaveAndBack.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndNew = useCallback(() => {
        isSaveAndNew.current = true;
        isSaveAndBack.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndBack = useCallback(() => {
        isSaveAndNew.current = false;
        isSaveAndBack.current = true;
        formRef.current?.submitForm();
    }, []);

    const handleIsSaveAndNew = useCallback(() => {
        return isSaveAndNew.current;
    }, []);

    const handleIsSaveAndBack = useCallback(() => {
        return isSaveAndBack.current;
    }, []);


    return {
        formRef,
        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndBack: handleSaveAndBack,
        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndBack: handleIsSaveAndBack
    };
}