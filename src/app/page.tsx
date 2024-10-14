"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Grid from "../components/grid/Grid";
import Header from "../components/Header";
import NewTask from "../components/NewTask";

export default function Home() {
  const [lists, setLists] = useState(initialLists);

  return (
    <main className="flex min-h-svh flex-col gap-4 bg-slate-950 p-4 text-white">
      <Header />
      <NewTask
        listTitles={lists.map((list) => list.title)}
        setLists={setLists}
      />
      <Grid lists={lists} setLists={setLists} />
      <Footer />
    </main>
  );
}

export interface Item {
  id: number;
  name: string;
  notes: string;
}

export interface List {
  title: string;
  tasks: Item[];
}

const initialLists: List[] = [
  {
    title: "In Progress",
    tasks: [
      { id: 0, name: "Update API documentation for Fitness app", notes: "" },
      {
        id: 1,
        name: "Implement user authentication for Finance app",
        notes: "",
      },
      {
        id: 2,
        name: "Refactor Redux state management for Dashboard",
        notes: "",
      },
      { id: 3, name: "Fix UI bugs on profile settings page", notes: "" },
      {
        id: 4,
        name: "Optimize database queries for reporting module",
        notes: "",
      },
    ],
  },
  {
    title: "Upcoming",
    tasks: [
      { id: 5, name: "Add dark mode support for Calendar app", notes: "" },
      { id: 6, name: "Migrate project to TypeScript", notes: "" },
      { id: 7, name: "Integrate third-party payment gateway", notes: "" },
      { id: 8, name: "Set up unit tests for Authentication module", notes: "" },
      {
        id: 9,
        name: "Develop notification system for Task Manager",
        notes: "",
      },
    ],
  },
  {
    title: "Needs Reviewed",
    tasks: [
      { id: 10, name: "Review code for new user registration flow", notes: "" },
      {
        id: 11,
        name: "Check performance optimizations in Billing app",
        notes: "",
      },
      { id: 12, name: "Test security fixes for Admin dashboard", notes: "" },
      {
        id: 13,
        name: "Evaluate design patterns in new microservices",
        notes: "",
      },
    ],
  },
  {
    title: "Blocked",
    tasks: [
      { id: 14, name: "Fix deployment issues on production server", notes: "" },
      {
        id: 15,
        name: "Resolve CORS issues for client-side API calls",
        notes: "",
      },
      {
        id: 16,
        name: "Investigate failing integration tests in CI pipeline",
        notes: "",
      },
      {
        id: 17,
        name: "Get access to project repository from DevOps team",
        notes: "",
      },
    ],
  },
  {
    title: "Completed",
    tasks: [],
  },
];
