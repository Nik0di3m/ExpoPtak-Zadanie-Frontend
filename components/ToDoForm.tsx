import { Button, Container, FormControl, TextField } from '@material-ui/core'
import axios from '../axios'
import { useState } from 'react'

interface CoolTodoForm {
    todo: any[]
    setTodo: any
}

const ToDoForm = ({ todo, setTodo }) => {
    const [input, setInput] = useState<string>('')

    const handleAddTodo = async () => {
        await axios.post('/todo', {
            task: input,
            isComplited: false,
        })
        await axios.get('/todo').then((res) => {
            setTodo([...res.data])
        })
        setInput('')
    }

    return (
        <Container style={{ marginTop: 8 }}>
            <FormControl fullWidth>
                <TextField
                    label="Task"
                    required
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 8 }}
                    onClick={handleAddTodo}
                >
                    Add Task
                </Button>
            </FormControl>
        </Container>
    )
}

export default ToDoForm
