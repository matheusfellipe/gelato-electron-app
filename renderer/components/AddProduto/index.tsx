import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IProduto, IProdutoType} from '../../services/produto.service'
import styles from "./styles.module.scss";
import * as yup from "yup";
import { FC } from "react";
import { formattedValue } from "../../utils/formatter";

const schema = yup.object().shape({
  saborName: yup.string().required("Campo obrigatório"),
  preco: yup.number().required("Campo obrigatório").min(0, "Mínimo 0"),
  quantidade: yup.number().required("Campo obrigatório").min(1, "Mínimo 1"),
  volume: yup.number().required("Campo obrigatório").min(0, "Mínimo 0"), 
});

interface AddCremosinhoProps {
  onSubmit: (data: IProduto) => void;
  onClose: () => void;
  value?: IProdutoType;
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
  } = useForm<IProdutoType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(value?.id && { id: value.id }),
      vlr_unitario: value?.vlr_unitario ?? "",
      qtd_estoque: value?.qtd_estoque ?? 0,
      sabor: value?.sabor ?? "",
    },
  });

  // const isInativo = watch("inativo") === "v" ? true : false;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
      <TextInput
        {...register("vlr_unitario")}
        label="Valor Unitário"
        placeholder="Valor Unitário"
        error={errors.vlr_unitario?.message}
      />
      <TextInput
        {...register("qtd_estoque")}
        label="Quantidade em Estoque"
        type="number"
        onChange={(e) => setValue("qtd_estoque", e.target.value ? Number(e.target.value) : 0)}
        placeholder="Quantidade em Estoque"
        error={errors.qtd_estoque?.message}
      />
      <TextInput
        {...register("sabor")}
        label="Sabor"
        placeholder="Sabor"
        error={errors.sabor?.message}
      />

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