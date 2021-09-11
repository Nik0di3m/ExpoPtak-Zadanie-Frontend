import { Button, Container, FormControl, TextField } from '@material-ui/core'
import axios from '../axios'
import { useState } from 'react'

interface CoolTodoForm {
    setTodo: any
}

const ToDoForm = ({ setTodo }: CoolTodoForm) => {
    const [input, setInput] = useState<string>('')

    const handleAddTodo = async () => {
        if (input.length > 2) {
            await axios
                .post('/todo', {
                    task: input,
                    isComplited: false,
                })
                .catch((err) => {
                    console.log(err)
                })
            await axios
                .get('/todo')
                .then((res) => {
                    setTodo([...res.data])
                })
                .catch((err) => {
                    console.log(err)
                })
            setInput('')
        }
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
