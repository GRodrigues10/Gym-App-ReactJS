import React, { useState } from 'react';

export function AcademiaApp() {
    const [tasks, setTasks] = useState([
       'Supino com Halter Inclinado',
       'Supino com Halter',
       'Cross no Alto',
       'Cross em baixo',
       'Peitoral na Máquina',
       'Rosca Bíceps na Barra',
       'Bíceps Martelo',
       'Bíceps no Banco',
       'Bíceps na Cadeira',
    ]);
    const [newTask, setNewTask] = useState('');
    const [dates, setDates] = useState(new Array(9).fill(45)); // Contagem para cada tarefa
    const [repeticoes, setRepeticoes] = useState(new Array(9).fill(4)); // Repetições para cada tarefa

    function handleChangeInput(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setDates((prevDates) => [...prevDates, 45]);
            setRepeticoes((prevRepeticoes) => [...prevRepeticoes, 4]);
            setNewTask('');
        }
    }

    function removeTask(index) {
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
        setDates((prevDates) => prevDates.filter((_, i) => i !== index));
        setRepeticoes((prevRepeticoes) =>
            prevRepeticoes.filter((_, i) => i !== index)
        );
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const updatedDates = [...dates];
            const updatedRepeticoes = [...repeticoes];

            // Swap para todas as listas
            [updatedTasks[index], updatedTasks[index - 1]] = [
                updatedTasks[index - 1],
                updatedTasks[index],
            ];
            [updatedDates[index], updatedDates[index - 1]] = [
                updatedDates[index - 1],
                updatedDates[index],
            ];
            [updatedRepeticoes[index], updatedRepeticoes[index - 1]] = [
                updatedRepeticoes[index - 1],
                updatedRepeticoes[index],
            ];

            setTasks(updatedTasks);
            setDates(updatedDates);
            setRepeticoes(updatedRepeticoes);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const updatedDates = [...dates];
            const updatedRepeticoes = [...repeticoes];

            // Swap para todas as listas
            [updatedTasks[index], updatedTasks[index + 1]] = [
                updatedTasks[index + 1],
                updatedTasks[index],
            ];
            [updatedDates[index], updatedDates[index + 1]] = [
                updatedDates[index + 1],
                updatedDates[index],
            ];
            [updatedRepeticoes[index], updatedRepeticoes[index + 1]] = [
                updatedRepeticoes[index + 1],
                updatedRepeticoes[index],
            ];

            setTasks(updatedTasks);
            setDates(updatedDates);
            setRepeticoes(updatedRepeticoes);
        }
    }

    function decrementRepetitions(index) {
        setRepeticoes((prevRepeticoes) =>
            prevRepeticoes.map((rep, i) => (i === index ? Math.max(rep - 1, 0) : rep))
        );
    }

    function startCountdown(index) {
        const intervalId = setInterval(() => {
            setDates((prevDates) =>
                prevDates.map((date, i) => {
                    if (i === index) {
                        if (date > 0) {
                            return date - 1;
                        } else {
                            clearInterval(intervalId);
                            return 45; // Reseta o valor
                        }
                    }
                    return date;
                })
            );
        }, 1000);
    }

    return (
        <>
            <div className="container">
                <div className="painel">
                    <input
                        type="text"
                        placeholder="Digite a tarefa..."
                        value={newTask}
                        onChange={handleChangeInput}
                    />
                    <button onClick={addTask} className="add">
                        Adicionar
                    </button>
                </div>
                <div className="tasks">
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <span>{task}</span>
                                <div>
                                    <button
                                        className="rep"
                                        onClick={() => decrementRepetitions(index)}
                                    >
                                        {repeticoes[index] > 0
                                            ? `${repeticoes[index]}x`
                                            : 'Ok'}
                                    </button>
                                    <button
                                        className="seconds"
                                        onClick={() => startCountdown(index)}
                                    >
                                        {dates[index] > 0 ? `${dates[index]}s` : 'Tempo Esgotado'}
                                    </button>
                                    <button
                                        className="move-button"
                                        onClick={() => moveUp(index)}
                                    >
                                        👆
                                    </button>
                                    <button
                                        className="move-button"
                                        onClick={() => moveDown(index)}
                                    >
                                        👇
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={() => removeTask(index)}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
