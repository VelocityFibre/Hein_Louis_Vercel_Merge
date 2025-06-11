"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Westside Fiber",
    Planning: 100,
    Design: 80,
    Implementation: 40,
    Testing: 0,
    Deployment: 0,
  },
  {
    name: "Downtown Network",
    Planning: 100,
    Design: 100,
    Implementation: 70,
    Testing: 30,
    Deployment: 0,
  },
  {
    name: "Rural Connectivity",
    Planning: 100,
    Design: 100,
    Implementation: 90,
    Testing: 60,
    Deployment: 20,
  },
  {
    name: "Industrial Park",
    Planning: 100,
    Design: 90,
    Implementation: 0,
    Testing: 0,
    Deployment: 0,
  },
  {
    name: "Eastside Expansion",
    Planning: 70,
    Design: 0,
    Implementation: 0,
    Testing: 0,
    Deployment: 0,
  },
]

export function ProjectsOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Planning" stackId="a" fill="#003049" />
        <Bar dataKey="Design" stackId="a" fill="#00406a" />
        <Bar dataKey="Implementation" stackId="a" fill="#005f9e" />
        <Bar dataKey="Testing" stackId="a" fill="#0077c2" />
        <Bar dataKey="Deployment" stackId="a" fill="#0090e9" />
      </BarChart>
    </ResponsiveContainer>
  )
}
