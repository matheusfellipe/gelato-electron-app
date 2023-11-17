import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import styles from "./styles.module.scss";

import InputMask from "react-input-mask";
import { IUsuario, IUsuarioType } from "../../services/cliente.service";


const schema = yup.object().shape({

  nome: yup.string().required("Campo obrigatório"),

  telefone: yup
    .string()
    .required("Campo obrigatório")
    .test({
      test: (obj, ctx) => {
        const telefone = obj?.replace(/\D/g, "");

        if (telefone && telefone?.length <= 11) {
          console.log(telefone?.length);
          return true;
        }

        return ctx.createError({
          message: "Telefone inválido",
        });
      },
    }),

  rua: yup.string().required("Campo obrigatório"),
  bairro: yup.string().required("Campo obrigatório"),
  cidade: yup.string().required("Campo obrigatório"),
});

interface AddUsuarioProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  value?: IUsuarioType;
}

export const AddCliente: FC<AddUsuarioProps> = ({
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
  } = useForm<IUsuarioType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(value?.id && { id: value.id }),
      nome: value?.nome ?? "",
      telefone: value?.telefone ?? "",
      rua: value?.rua ?? "",
      bairro: value?.bairro ?? "",
      cidade: value?.cidade ?? "",
    }
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
      <TextInput
        {...register("rua")}
        label="Rua"
        placeholder="Digite a rua do cliente"
        error={errors.rua?.message}

      />

      <TextInput
        {...register("bairro")}
        label="Bairro"
        placeholder="Digite a bairro do cliente"
        error={errors.bairro?.message}
        maxLength={20}
      />
       <TextInput
        {...register("cidade")}
        label="Cidade"
        placeholder="Digite a cidade do cliente"
        error={errors.cidade?.message}
        maxLength={20}
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