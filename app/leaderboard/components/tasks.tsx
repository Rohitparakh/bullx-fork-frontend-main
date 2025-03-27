"use client"

import { Task } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const sampleTask: Task = {
  title: "Touch grass.",
  desc: "Go outside for once.",
  points: 10,
  completed: true,
};

const sampleTasks: Task[] = new Array(21).fill(sampleTask);

export default function TasksCard() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  return (
    <Card className="w-full lg:max-w-72 !rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Complete tasks to earn points.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full overflow-scroll pb-32">
        {tasks &&
          tasks.map((task, i) => (
            <div
              key={i}
              className="border-t border-ton-blue-950 flex gap-4 items-center pt-2"
            >
              {task.completed ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaRegCircle className="text-ton-blue-200/60" />
              )}
              <div className="text-md flex flex-col text-ton-blue-200/40">
                <span className="text-white">{task.title}</span>
                <span className="flex gap-2 items-center">
                  <span className="text-ton-blue-400/70 text-sm">
                    {task.points} pts
                  </span>
                  {task.desc}
                </span>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
