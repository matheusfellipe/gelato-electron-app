import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { IProduto} from '../../services/produto.service'
import styles from "./styles.module.scss";
import * as yup from "yup";
import { FC } from "react";
import { formattedValue } from "../../utils/formatter";

const schema = yup.object().shape({
  saborId: yup.string().required("Campo obrigatório"),
  preco: yup.number().required("Campo obrigatório").min(0, "Mínimo 0"),
  quantidade: yup.number().required("Campo obrigatório").min(1, "Mínimo 1"),
  volume: yup.number().required("Campo obrigatório").min(0, "Mínimo 0"), 
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
      preco:value?.preco  ?? 0,
      quantidade: value?.quantidade ?? 0,
      volume: value?.volume ?? 0,
      saborId: value?.saborId,
    },
  });

  // const isInativo = watch("inativo") === "v" ? true : false;

  return (
<form onSubmit={handleSubmit(onSubmit)} className={styles.containerModal}>
  <TextInput
    {...register("preco")}
    label="Preço"
    type="number" 
    placeholder="Preço"
    onChange={(e) => {
    

      setValue("preco", e.target.value? Number(e.target.value) : 0);
    }}
    error={errors.preco?.message}
  />
  <TextInput
    {...register("quantidade")}
    label="Quantidade"
    type="number" // Definido como número para receber apenas valores numéricos
    onChange={(e) =>
      setValue("quantidade", e.target.value ? Number(e.target.value) : 0)
    }
    placeholder="Quantidade"
    error={errors.quantidade?.message}
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