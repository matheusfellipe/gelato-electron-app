import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, PasswordInput, Switch, TextInput } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import styles from "./styles.module.scss";

import InputMask from "react-input-mask";
import { ISabor,ISaborType } from "../../services/sabor.service";

const schema = yup.object().shape({

  descricao: yup.string().required("Campo obrigatório"),
  ativo: yup.bool(),
 
});

interface AddSaborProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  value?: ISaborType;
}

export const AddSabor: FC<AddSaborProps> = ({
  onClose,
  onSubmit,
  value,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ISaborType>({
    resolver: yupResolver(schema),
    defaultValues: {
     
      descricao: value?.descricao ?? "",
      ativo: value?.ativo
     
    },
    
  });


 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("descricao")}
        label="Nome"
        placeholder="Nome"
        error={errors.descricao?.message}
      />


    
     
       <Switch
        {...register("ativo")}
        label="Ativo"
       
      />

      <div className={styles.ContainerButtons}>
        <Button
          className={styles.Buttons}
          color="blue.6"
          variant="outline"
          onClick={onClose}

        >
          Cancelar
        </Button>
        <Button
          className={styles.Buttons}
          color="blue.6"
          type="submit"

        >
          Gravar
        </Button>
      </div>
    </form>
  );
};