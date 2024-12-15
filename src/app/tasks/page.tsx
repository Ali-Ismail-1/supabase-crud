// src/app/tasks/page.tsx
"use client";

import styles from "./tasks.module.css"
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

// Define a type for Task
type Task = {
    id: number;
    title: string;
    completed: boolean;
};


export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data, error } = await supabase.from("tasks").select();
                if (error) throw error;
                setTasks(data || []);
            } catch (err: any) {
                console.error("Error fetching tasks: ", err);
                setError("Failed to load tasks. Please try again.");
            }
        };

        fetchTasks();
    }, []);

    // Handle adding a task
    const handleAddTask = async () => {
        if (!newTask) {
            setError("Task title cannot be empty.");
            return;
        }

        try {
            const response = await fetch("/api/tasks/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTask }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const addedTask = await response.json();
            setTasks((prev) => [...prev, ...addedTask]);
            setNewTask("");
        } catch (err: any) {
            console.error("Error adding task: ", err);
            setError("Failed to add task, Please try again");
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch("/api/tasks/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err: any) {
            console.error("Error deleting task: ", err);
            setError("Failed to delete task. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tasks Page</h1>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.addTaskForm}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task"
                    className={styles.input}
                />
                <button onClick={handleAddTask} className={styles.addButton}>
                    Add Task
                </button>
            </div>

            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <li key={task.id} className={styles.taskItem}>
                        {task.title}
                        <button onClick={() => handleDeleteTask(task.id)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
