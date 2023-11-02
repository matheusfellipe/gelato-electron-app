import { FC } from "react";
import { ICremosinhoSell } from "../../pages/venda";
import { ActionIcon } from "@mantine/core";

import { formattedValue } from "../../utils/formatter";
import styles from "./styles.module.scss";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

interface CartProps {
  actualCremosinho: ICremosinhoSell[];
  addById: (id: number) => void;
  removeById: (id: number) => void;
  deleteById: (id: number) => void;
}

export const Cart: FC<CartProps> = ({
  actualCremosinho,
  addById,
  removeById,
  deleteById,
}) => {
  return (
    <div className={styles.containerCard}>
      <p>Resumo</p>

      {actualCremosinho?.map((element) => (
        <div className={styles.contentCard} key={element.id_cremosinho}>
          <p>{element.sabor}</p>
          <div className={styles.hStack}>
            <ActionIcon
              disabled={element.qtd === 1}
              onClick={() => removeById(element.id_cremosinho!)}
            >
              <IconMinus  />
            </ActionIcon>
            <p>{element.qtd}</p>
            <ActionIcon
              disabled={element.qtd === Number(element.qtd_estoque)}
              onClick={() => addById(element.id_cremosinho!)}
            >
              <IconPlus  />
            </ActionIcon>
          </div>

          <p>{formattedValue(Number(element.vlr_unitario) * element.qtd)}</p>

          <ActionIcon
            color="red"
            onClick={() => deleteById(element.id_cremosinho!)}
          >
            <IconTrash  />
          </ActionIcon>
        </div>
      ))}
    </div>
  );
};