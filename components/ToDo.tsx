import {
    Card,
    CardContent,
    Container,
    IconButton,
    Typography,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useState } from 'react'
import axios from '../axios'

interface CoolTodo {
    id: number
    text: string
    isComplited: boolean
    todo: any[]
    setTodo: any
    data: any[]
}

const ToDo = ({ id, text, isComplited, todo, setTodo, data }: CoolTodo) => {
    const [complited, setComplited] = useState<boolean>(isComplited)

    const TypoStyle = complited
        ? { textDecoration: 'line-through', marginLeft: 4 }
        : { textDecoration: 'none', marginLeft: 4 }

    const handleDelete = async () => {
        await axios
            .delete('todo', {
                data: {
                    id: id,
                },
            })
            .catch((err) => {
                console.log(err)
            })
        setTodo(todo.filter((el: any) => el.id !== id))
    }

    const handleComplited = async () => {
        setComplited(!complited)
        await axios
            .patch('todo', {
                id: id,
                isComplited: !isComplited,
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(data.filter((el: any) => el.isComplited))
        setTodo([...todo])
    }
    return (
        <Container style={{ marginTop: 8 }}>
            <Card style={{ backgroundColor: '#333' }}>
                <CardContent
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <input
                            type="checkbox"
                            defaultChecked={complited}
                            onChange={handleComplited}
                        />
                        <Typography style={TypoStyle}>{text}</Typography>
                    </div>
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ToDo
