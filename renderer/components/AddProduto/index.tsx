import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IProduto} from '../../services/produto.service'
import styles from "./styles.module.scss";
import * as yup from "yup";
import { FC } from "react";
import { formattedValue } from "../../utils/formatter";

const schema = yup.object().shape({
  sabor: yup.string().required("Campo obrigatório"),
  vlr_unitario: yup.string().required("Campo obrigatório"),
  qtd_estoque: yup.number().required("Campo obrigatório").min(1, "Mínimo 1"),
});

interface AddCremosinhoProps {
  onSubmit: (data: IProduto) => void;
  onClose: () => void;
  value?: IProduto;
}

export const AddProduto: FC<AddCremosinhoProps> = ({
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
  } = useForm<IProduto>({
    resolver: yupResolver(schema),
    defaultValues: {
      preco: formattedValue(value?.preco ?? "") ?? "R$ 0,00",
      quantidade: value?.quantidade ?? 0,
      volume: value?.volume ?? 0,
      saborId: value?.saborId,
    },
  });

  // const isInativo = watch("inativo") === "v" ? true : false;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("sabor")}
        label="Sabor"
        placeholder="Sabor"
        error={errors.sabor?.message}
      />
      <TextInput
        {...register("vlr_unitario")}
        label="Preço"
        placeholder="Preço"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");

          if (Number(value) > 10000) {
            setValue("vlr_unitario", formattedValue(9999, true));
            return;
          }

          setValue(
            "vlr_unitario",
            e.target.value ? formattedValue(value, true) : "R$ 0,00"
          );
        }}
        error={errors.vlr_unitario?.message}
      />
      <TextInput
        {...register("qtd_estoque")}
        label="Quantidade"
        type="number"
        onChange={(e) =>
          setValue("qtd_estoque", e.target.value ? Number(e.target.value) : 0)
        }
        placeholder="Quantidade"
        error={errors.qtd_estoque?.message}
      />

      {value?.id_cremosinho && (
        <Checkbox
          checked={isInativo}
          onChange={(e) => setValue("inativo", e.target.checked ? "v" : "f")}
          label="Inativo"
        />
      )}

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