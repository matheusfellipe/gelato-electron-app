import { Button, Switch, TextInput } from "@mantine/core"
import { FC } from "react"
import { useForm } from "react-hook-form"


interface ISaborFormData {
    descricao:string
    ativo:boolean
}

export const SaborModal:FC<ISaborFormData> = ()=>{
    const {register,formState:{errors},reset,handleSubmit, watch,setValue} = useForm<ISaborFormData>()
    const ativo = watch('ativo')
    const onSubmit = (data:ISaborFormData)=>{
        console.log(data)
        reset()
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label='Descrição' {...register('descricao')} placeholder="Descrição"/>
        <Switch checked={ativo} onChange={(event) => setValue('ativo',event.currentTarget.checked)} label="Está disponível"/>
        <Button type="submit">Salvar</Button>
    </form>)
}