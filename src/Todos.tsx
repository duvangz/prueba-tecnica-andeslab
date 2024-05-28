import { useEffect, useMemo, useState } from "react"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const TODO_STATUS = {
    COMPLETED: "COMPLETED",
    NOT_COMPLETED: "NOT_COMPLETED"
} as const

const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const todos = response.json()
    return todos
}

export default function Todos () {

    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        getTodos()
            .then((data) => setTodos(data))
            .catch(error => console.error(error))
    }, [])

    const todosByStatus: { status: keyof typeof TODO_STATUS, count: number }[] = useMemo(() => {
        let completedCount = 0

        for (let { completed } of todos) {
            if (completed) {
                completedCount++
            }
        }

        return [{ status: TODO_STATUS.COMPLETED, count: completedCount / todos.length }, { status: TODO_STATUS.NOT_COMPLETED, count: (todos.length - completedCount) / todos.length }]
    }, [todos])


    return (
        <PieChart width={400} height={300} style={{ margin: "auto" }} >
            <Pie
                nameKey="status"
                dataKey="count"
                data={todosByStatus}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                label={({ value }) => `${(value * 100).toFixed(0)}%`}
            >
                <Cell key="completed" fill="#00FE00" />
                <Cell key="not-completed" fill="#FE0000" />
            </Pie>
            <Tooltip formatter={(value, name) => [`${(value as number * 100).toFixed(0)}%`, name === TODO_STATUS.COMPLETED ? `Completadas` : `No completadas`]} />
            <Legend formatter={(value) => value === TODO_STATUS.COMPLETED ? 'Completadas' : 'No completadas'} />
        </PieChart>
    )
}