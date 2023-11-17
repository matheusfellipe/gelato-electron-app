import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, PasswordInput, Switch, TextInput } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import styles from "./styles.module.scss";

import InputMask from "react-input-mask";
import { IEntregador,IEntregadorType } from "../../services/entregador.service";

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  telefone: yup.string().required("Campo obrigatório"),
});

interface AddEntregadorProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  value?: IEntregadorType;
}

export const AddEntregador: FC<AddEntregadorProps> = ({
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
  } = useForm<IEntregadorType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(value?.id && { id: value.id }),
      nome: value?.nome || "",
      telefone: value?.telefone || ""
     
    },
    
  });

  const telefoneValue = watch("telefone");
 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("nome")}
        label="Nome"
        placeholder="Nome"
        error={errors.nome?.message}
      />
       <Input.Wrapper label="Telefone" error={errors.telefone?.message}>
        <Input
          {...register("telefone")}
          component={InputMask as any}
          mask="(99) 99999-9999"
          value={telefoneValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue("telefone", e.target.value.replace(/[^A-Z0-9]+/gi, ""))
          }
          invalid={!!errors.telefone?.message}
          placeholder="Digite o telefone do usuário"
        />
      </Input.Wrapper>

      <div className={styles.ContainerButtons}>
        <Button className={styles.Buttons} color="blue.6" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button className={styles.Buttons} color="blue.6" type="submit">
          Gravar
        </Button>
      </div>
    </form>
  );
};