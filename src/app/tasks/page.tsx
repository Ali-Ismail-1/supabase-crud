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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch tasks after component mounts
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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tasks Page</h1>
            {error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <ul className={styles.taskList}>
                    {tasks.map((task) => (
                        <li key={task.id} className="{styles.taskItem}">
                            {task.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
