import { TextInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IProduto, IProdutoType, getProdutos } from "../../services/produto.service";
import styles from "./styles.module.scss";
import { IconSearch } from "@tabler/icons";
import { formattedValue } from "../../utils/formatter";

interface ListAllCremosinhoProps {
  actualCremosinho: IProdutoType[];
  addCremosinho: (ICremosinho: IProdutoType) => void;
}

export const ListAllCremosinho: FC<ListAllCremosinhoProps> = ({
  actualCremosinho,
  addCremosinho,
}) => {
  const [cremosinho, setCremosinho] = useState<IProdutoType[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await getProdutos();
        setCremosinho(response);
      } catch (error) {}
    })();
  }, []);

  const filterValue = filter
    ? cremosinho.filter((element) =>
        element.sabor.toLowerCase().includes(filter.toLowerCase())
      )
    : cremosinho;

  return (
    <div className={styles.containerAllCremosinho}>
      <TextInput
        label="Sabor"
        placeholder="Sabor"
        value={filter}
        onChange={(event) => setFilter(event.currentTarget.value)}
      
      />

      <main className={styles.contentAllCremosinho}>
        {filterValue.length ? (
          filterValue.map((element) => {
            const isActive = actualCremosinho.some(
              (actual) => actual.id === element.id
            );

            return (
              <div
                onClick={() => !isActive && addCremosinho(element)}
                className={`${styles.itemAllCremosinho} ${
                  isActive ? styles.active : ""
                }`}
                key={element.id}
              >
                <p>{element.sabor}</p>
                <p>{formattedValue(element.vlr_unitario)}</p>
              </div>
            );
          })
        ) : (
          <span className={styles.fontXS}>Nenhum sabor encontrado</span>
        )}
      </main>
    </div>
  );
};