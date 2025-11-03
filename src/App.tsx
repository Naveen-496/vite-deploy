"use client";

import type React from "react";

import { useState } from "react";
import {
  Plus,
  Check,
  Trash2,
  Calendar,
  Flag,
  X,
  CheckCircle2,
  ListTodo,
  AlertCircle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create mockups and wireframes",
      completed: false,
      dueDate: "2025-11-15",
      priority: "high",
      createdAt: "2025-10-30",
    },
    {
      id: "2",
      title: "Review pull requests",
      description: "Check team submissions",
      completed: true,
      dueDate: "2025-10-30",
      priority: "medium",
      createdAt: "2025-10-30",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTasks([newTask, ...tasks]);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      setShowForm(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const highPriorityCount = tasks.filter(
    (t) => !t.completed && t.priority === "high"
  ).length;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const priorityColors = {
    low: { bg: "#0ea5e9", text: "#e0f2fe", border: "#0284c7" },
    medium: { bg: "#f59e0b", text: "#fef3c7", border: "#d97706" },
    high: { bg: "#ef4444", text: "#fee2e2", border: "#dc2626" },
  };

  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(to bottom right, #0f172a, #0f172a);
          color: #e2e8f0;
        }

        button, input, select, textarea {
          transition: all 0.2s ease;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        ::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-form {
          animation: fadeIn 0.3s ease-out, slideInFromTop 0.3s ease-out;
        }
      `}</style>

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.title}>Task Manager</h1>
              <p style={styles.subtitle}>
                Stay organized and productive with your daily tasks
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                ...styles.newTaskBtn,
                ...(showForm && styles.newTaskBtnActive),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(37, 99, 235, 0.3)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(37, 99, 235, 0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Plus size={20} />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {/* Total Tasks */}
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Total Tasks</p>
                <p style={styles.statValue}>{tasks.length}</p>
              </div>
              <div style={styles.statIcon}>
                <ListTodo size={32} color="#60a5fa" />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Completed</p>
                <div style={styles.completedRow}>
                  <p style={styles.statValue}>{completedCount}</p>
                  <p style={styles.completionRate}>{completionRate}%</p>
                </div>
              </div>
              <div style={styles.statIcon}>
                <CheckCircle2 size={32} color="#4ade80" />
              </div>
            </div>
          </div>

          {/* High Priority */}
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>High Priority</p>
                <p style={styles.statValue}>{highPriorityCount}</p>
              </div>
              <div style={styles.statIcon}>
                <AlertCircle size={32} color="#f87171" />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="animate-form" style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Create New Task</h2>
              <button
                onClick={() => setShowForm(false)}
                style={styles.closeBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(71, 85, 105, 0.5)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={addTask} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Task Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  style={styles.input}
                  required
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(100, 116, 139, 0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add task details"
                  style={{ ...styles.input, ...styles.textarea }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(100, 116, 139, 0.5)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={styles.input}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(100, 116, 139, 0.5)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Priority</label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as "low" | "medium" | "high")
                    }
                    style={styles.input}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(100, 116, 139, 0.5)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div style={styles.formButtons}>
                <button
                  type="submit"
                  style={styles.submitBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(37, 99, 235, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 10px 15px -3px rgba(37, 99, 235, 0.2)";
                  }}
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={styles.cancelBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(71, 85, 105, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(71, 85, 105, 0.5)";
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Task List */}
        <div style={styles.taskListContainer}>
          {tasks.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p style={styles.emptyText}>
                No tasks yet. Create one to get started!
              </p>
            </div>
          ) : (
            <>
              {activeTasks.length > 0 && (
                <div style={styles.taskSection}>
                  <h2 style={styles.sectionTitle}>
                    <span style={styles.sectionBar}></span>
                    Active Tasks
                  </h2>
                  <div style={styles.taskGroup}>
                    {activeTasks.map((task) => (
                      <div key={task.id} style={styles.taskCard}>
                        <div style={styles.taskContent}>
                          <button
                            onClick={() => toggleTask(task.id)}
                            style={styles.checkbox}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(59, 130, 246, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {task.completed && (
                              <Check size={16} color="white" />
                            )}
                          </button>

                          <div style={styles.taskInfo}>
                            <h3 style={styles.taskTitle}>{task.title}</h3>
                            {task.description && (
                              <p style={styles.taskDescription}>
                                {task.description}
                              </p>
                            )}

                            <div style={styles.taskMeta}>
                              {task.dueDate && (
                                <div style={styles.taskDate}>
                                  <Calendar size={14} />
                                  <span>
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}

                              <div
                                style={{
                                  ...styles.priorityBadge,
                                  backgroundColor: `${
                                    priorityColors[task.priority].bg
                                  }20`,
                                  color: priorityColors[task.priority].text,
                                  borderColor:
                                    priorityColors[task.priority].border,
                                }}
                              >
                                <Flag size={12} />
                                <span>
                                  {task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteTask(task.id)}
                            style={styles.deleteBtn}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#f87171";
                              e.currentTarget.style.backgroundColor =
                                "rgba(239, 68, 68, 0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#64748b";
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {completedTasks.length > 0 && (
                <div style={styles.taskSection}>
                  <h2 style={{ ...styles.sectionTitle, color: "#94a3b8" }}>
                    <span
                      style={{
                        ...styles.sectionBar,
                        background:
                          "linear-gradient(to bottom, #475569, #334155)",
                      }}
                    ></span>
                    Completed
                  </h2>
                  <div style={styles.taskGroup}>
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        style={{
                          ...styles.taskCard,
                          ...styles.completedTaskCard,
                        }}
                      >
                        <div style={styles.taskContent}>
                          <button
                            onClick={() => toggleTask(task.id)}
                            style={{
                              ...styles.checkbox,
                              ...styles.completedCheckbox,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(34, 197, 94, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <Check size={16} color="white" />
                          </button>

                          <div style={styles.taskInfo}>
                            <h3
                              style={{
                                ...styles.taskTitle,
                                ...styles.completedTaskTitle,
                              }}
                            >
                              {task.title}
                            </h3>
                            {task.description && (
                              <p
                                style={{
                                  ...styles.taskDescription,
                                  color: "#475569",
                                }}
                              >
                                {task.description}
                              </p>
                            )}

                            <div style={styles.taskMeta}>
                              {task.dueDate && (
                                <div
                                  style={{
                                    ...styles.taskDate,
                                    color: "#64748b",
                                  }}
                                >
                                  <Calendar size={14} />
                                  <span>
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}

                              <div
                                style={{
                                  ...styles.priorityBadge,
                                  backgroundColor: `${
                                    priorityColors[task.priority].bg
                                  }20`,
                                  color: priorityColors[task.priority].text,
                                  borderColor:
                                    priorityColors[task.priority].border,
                                }}
                              >
                                <Flag size={12} />
                                <span>
                                  {task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteTask(task.id)}
                            style={{ ...styles.deleteBtn, opacity: 0.5 }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#f87171";
                              e.currentTarget.style.backgroundColor =
                                "rgba(239, 68, 68, 0.1)";
                              e.currentTarget.style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#64748b";
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.opacity = "0.5";
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #0f172a, #0f172a)",
    padding: "32px 16px",
  } as React.CSSProperties,

  wrapper: {
    maxWidth: "80rem",
    margin: "0 auto",
  } as React.CSSProperties,

  header: {
    marginBottom: "48px",
  } as React.CSSProperties,

  headerContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
    marginBottom: "8px",
    justifyContent: "space-between",
    alignItems: "flex-start",
  } as React.CSSProperties,

  title: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  subtitle: {
    fontSize: "18px",
    color: "#94a3b8",
  } as React.CSSProperties,

  newTaskBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  newTaskBtnActive: {
    background: "linear-gradient(to right, #1d4ed8, #1e40af)",
  } as React.CSSProperties,

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "40px",
  } as React.CSSProperties,

  statCard: {
    position: "relative" as const,
    background:
      "linear-gradient(to bottom right, rgba(30, 41, 59, 0.5), rgba(30, 41, 59, 0.3))",
    border: "1px solid rgba(100, 116, 139, 0.5)",
    borderRadius: "12px",
    padding: "24px",
    transition: "all 0.2s ease",
    cursor: "pointer",
  } as React.CSSProperties,

  statContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,

  statLabel: {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  } as React.CSSProperties,

  statValue: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#ffffff",
  } as React.CSSProperties,

  completedRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  } as React.CSSProperties,

  completionRate: {
    fontSize: "14px",
    color: "#64748b",
  } as React.CSSProperties,

  statIcon: {
    padding: "12px",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: "8px",
  } as React.CSSProperties,

  formContainer: {
    marginBottom: "32px",
    background:
      "linear-gradient(to bottom right, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.5))",
    border: "1px solid rgba(100, 116, 139, 0.5)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(4px)",
  } as React.CSSProperties,

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  } as React.CSSProperties,

  formTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
  } as React.CSSProperties,

  closeBtn: {
    padding: "8px",
    color: "#94a3b8",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  } as React.CSSProperties,

  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: "8px",
  } as React.CSSProperties,

  input: {
    padding: "12px 16px",
    background: "rgba(71, 85, 105, 0.5)",
    border: "1px solid rgba(100, 116, 139, 0.5)",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  textarea: {
    resize: "none" as const,
    minHeight: "100px",
  } as React.CSSProperties,

  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  } as React.CSSProperties,

  formButtons: {
    display: "flex",
    gap: "12px",
    paddingTop: "16px",
  } as React.CSSProperties,

  submitBtn: {
    flex: 1,
    padding: "12px 16px",
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  cancelBtn: {
    flex: 1,
    padding: "12px 16px",
    background: "rgba(71, 85, 105, 0.5)",
    color: "#ffffff",
    border: "1px solid rgba(100, 116, 139, 0.5)",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  taskListContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "32px",
  } as React.CSSProperties,

  emptyState: {
    textAlign: "center" as const,
    paddingTop: "80px",
    paddingBottom: "80px",
  } as React.CSSProperties,

  emptyIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(30, 41, 59, 0.5)",
    marginBottom: "16px",
    color: "#64748b",
  } as React.CSSProperties,

  emptyText: {
    color: "#94a3b8",
    fontSize: "18px",
  } as React.CSSProperties,

  taskSection: {
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,

  sectionBar: {
    width: "4px",
    height: "24px",
    background: "linear-gradient(to bottom, #2563eb, #60a5fa)",
    borderRadius: "2px",
  } as React.CSSProperties,

  taskGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  } as React.CSSProperties,

  taskCard: {
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(100, 116, 139, 0.5)",
    background:
      "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(30, 41, 59, 0.3))",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  completedTaskCard: {
    background: "rgba(30, 41, 59, 0.3)",
    borderColor: "rgba(100, 116, 139, 0.3)",
    opacity: 0.6,
  } as React.CSSProperties,

  taskContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  } as React.CSSProperties,

  checkbox: {
    flexShrink: 0,
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "2px solid rgba(100, 116, 139, 0.6)",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "4px",
  } as React.CSSProperties,

  completedCheckbox: {
    background: "linear-gradient(to right, #16a34a, #15803d)",
    borderColor: "#16a34a",
    boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.2)",
  } as React.CSSProperties,

  taskInfo: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  taskTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px",
  } as React.CSSProperties,

  completedTaskTitle: {
    color: "#64748b",
    textDecoration: "line-through",
  } as React.CSSProperties,

  taskDescription: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "12px",
  } as React.CSSProperties,

  taskMeta: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    gap: "12px",
  } as React.CSSProperties,

  taskDate: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
    color: "#94a3b8",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  priorityBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    borderRadius: "9999px",
    border: "1px solid",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  deleteBtn: {
    flexShrink: 0,
    padding: "8px",
    color: "#64748b",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    opacity: 0,
  } as React.CSSProperties,
};
