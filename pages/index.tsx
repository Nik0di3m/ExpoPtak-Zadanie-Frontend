import { Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import ToDo from '../components/ToDo'
import ToDoForm from '../components/ToDoForm'
import axios from '../axios'
interface CoolTodo {
    id: number
    task: string
    isComplited: boolean
    todo: any[]
}

const Home = () => {
    const [todo, setTodo] = useState<CoolTodo[]>([])
    const [data, setData] = useState<CoolTodo[]>([])

    const fetchTodo = async () => {
        await axios.get('/todo').then((res) => {
            setData([...res.data])
        })
    }

    useEffect(() => {
        fetchTodo()
    }, [todo])
    return (
        <Container maxWidth="sm">
            <ToDoForm setTodo={setTodo} />
            {data
                .sort((a, b) => (b.isComplited > a.isComplited && -1) || 1)
                .map((item: CoolTodo) => (
                    <ToDo
                        key={item.id}
                        id={item.id}
                        text={item.task}
                        isComplited={item.isComplited}
                        todo={todo}
                        setTodo={setTodo}
                        data={data}
                    />
                ))}
        </Container>
    )
}

export default Home
