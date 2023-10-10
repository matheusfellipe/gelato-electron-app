import {
    Button,
    Table,
    useMantineColorScheme,
    useMantineTheme,
  } from '@mantine/core'
import chroma from 'chroma-js'
 
  import { useRouter } from 'next/router'
  import { FC } from 'react'
 
  import styles from './styles.module.scss'

  
  export interface CustomTableProps {
    array: any[]
    className?: Partial<Record<never, string>> | undefined
    color?: string
    editValue: (id: number) => void
    removeValue: (id: number) => void
    hiddenColumn?: string
    canview?: (id: number) => void
  }
  
  export const CustomTable: FC<CustomTableProps> = ({
    array,
    className,
    color,
    editValue,
    removeValue,
    hiddenColumn,
    canview,
  }) => {
    const { colorScheme } = useMantineColorScheme()
    const { colors } = useMantineTheme()
    const dark = colorScheme === 'dark'
  
    const { pathname } = useRouter()
  
    const formattedArray: any[] = hiddenColumn
      ? array.reduce((acc, item: object) => {
          const object = Object.entries(item).reduce((ccc, [key, value]) => {
            if (key === hiddenColumn) {
              return null
            }
  
            ccc = { ...ccc, [key]: value }
            return ccc as any
          }, {})
  
          acc.push(object)
          return acc
        }, [] as any[])
      : array
  
    const thsNames = Object.keys(formattedArray[0])
  
    const ths = (
      <tr className={styles.TrMaster}>
        {thsNames.map((element, index) => (
          <th
            style={{
              backgroundColor: color
                ? chroma(color).alpha(0.2).hex()
                : 'transparent',
            }}
            key={`${element}-${index}`}
          >
            {element}
          </th>
        ))}
      
      </tr>
    )
  
    const rows = formattedArray.map((element, i) => {
      const tdNames: any[] = Object.values(element)
      return (
        <tr key={i}>
          {tdNames.map((value, index) => (
            <td key={`${value}${index}`}>{value}</td>
          ))}
         
        </tr>
      )
    })
  
    return (
      <div
       
        style={{
          border: 2,
          borderColor: dark ? colors.gray[8] : colors.gray[2],
          borderStyle: 'solid',
        }}
        className={styles.tableWrapper}
      >
        <Table
          className={`${styles.mainTable} ${className}`}
          horizontalSpacing='md'
          striped
          highlightOnHover
          verticalSpacing='xs'
        >
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    )
  }