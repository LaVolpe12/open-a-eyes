"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js"
import { Bar, Pie, Scatter } from "react-chartjs-2"
import type { Submission } from "../page"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

type VisualizationsProps = {
  submissions: Submission[]
  selectedVisualization: string
  selectedGroupBy: string
}

const calculateSUSScore = (submission: Submission) => {
  const oddItems = [submission.sus1, submission.sus3, submission.sus5, submission.sus7, submission.sus9]
  const evenItems = [submission.sus2, submission.sus4, submission.sus6, submission.sus8, submission.sus10]
  
  const oddSum = oddItems.reduce((sum, item) => sum + (parseInt(item) - 1), 0)
  const evenSum = evenItems.reduce((sum, item) => sum + (5 - parseInt(item)), 0)
  
  return (oddSum + evenSum) * 2.5
}

export function Visualizations({ submissions, selectedVisualization, selectedGroupBy }: VisualizationsProps) {
  const susScores = submissions.map(sub => calculateSUSScore(sub))
  const averageSUS = susScores.reduce((a, b) => a + b, 0) / susScores.length

  const renderSUSScoreDistribution = () => {
    const scoreRanges = {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
    }

    susScores.forEach(score => {
      if (score <= 20) scoreRanges["0-20"]++
      else if (score <= 40) scoreRanges["21-40"]++
      else if (score <= 60) scoreRanges["41-60"]++
      else if (score <= 80) scoreRanges["61-80"]++
      else scoreRanges["81-100"]++
    })

    return (
      <Bar
        data={{
          labels: Object.keys(scoreRanges),
          datasets: [
            {
              label: "Anzahl der Teilnehmer",
              data: Object.values(scoreRanges),
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
              labels: {
                color: "rgb(209, 213, 219)",
              },
            },
            title: {
              display: true,
              text: "Verteilung der SUS-Scores",
              color: "rgb(209, 213, 219)",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "rgb(209, 213, 219)",
              },
              grid: {
                color: "rgba(75, 85, 99, 0.2)",
              },
            },
            x: {
              ticks: {
                color: "rgb(209, 213, 219)",
              },
              grid: {
                color: "rgba(75, 85, 99, 0.2)",
              },
            },
          },
        }}
      />
    )
  }

  const renderDemographics = () => {
    const demographics = {
      gender: submissions.reduce((acc, sub) => {
        acc[sub.gender] = (acc[sub.gender] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      education: submissions.reduce((acc, sub) => {
        acc[sub.education] = (acc[sub.education] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      techAffinity: submissions.reduce((acc, sub) => {
        acc[sub.techAffinity] = (acc[sub.techAffinity] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Pie
          data={{
            labels: Object.keys(demographics.gender),
            datasets: [
              {
                data: Object.values(demographics.gender),
                backgroundColor: [
                  "rgba(59, 130, 246, 0.5)",
                  "rgba(16, 185, 129, 0.5)",
                  "rgba(245, 158, 11, 0.5)",
                ],
                borderColor: [
                  "rgb(59, 130, 246)",
                  "rgb(16, 185, 129)",
                  "rgb(245, 158, 11)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
                labels: {
                  color: "rgb(209, 213, 219)",
                },
              },
              title: {
                display: true,
                text: "Geschlechterverteilung",
                color: "rgb(209, 213, 219)",
              },
            },
          }}
        />
        <Pie
          data={{
            labels: Object.keys(demographics.education),
            datasets: [
              {
                data: Object.values(demographics.education),
                backgroundColor: [
                  "rgba(59, 130, 246, 0.5)",
                  "rgba(16, 185, 129, 0.5)",
                  "rgba(245, 158, 11, 0.5)",
                  "rgba(239, 68, 68, 0.5)",
                ],
                borderColor: [
                  "rgb(59, 130, 246)",
                  "rgb(16, 185, 129)",
                  "rgb(245, 158, 11)",
                  "rgb(239, 68, 68)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
                labels: {
                  color: "rgb(209, 213, 219)",
                },
              },
              title: {
                display: true,
                text: "Bildungsabschlüsse",
                color: "rgb(209, 213, 219)",
              },
            },
          }}
        />
        <Pie
          data={{
            labels: Object.keys(demographics.techAffinity),
            datasets: [
              {
                data: Object.values(demographics.techAffinity),
                backgroundColor: [
                  "rgba(59, 130, 246, 0.5)",
                  "rgba(16, 185, 129, 0.5)",
                  "rgba(245, 158, 11, 0.5)",
                ],
                borderColor: [
                  "rgb(59, 130, 246)",
                  "rgb(16, 185, 129)",
                  "rgb(245, 158, 11)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
                labels: {
                  color: "rgb(209, 213, 219)",
                },
              },
              title: {
                display: true,
                text: "Tech-Affinität",
                color: "rgb(209, 213, 219)",
              },
            },
          }}
        />
      </div>
    )
  }

  const renderCorrelations = () => {
    const data = submissions.map(sub => ({
      x: parseInt(sub.age),
      y: calculateSUSScore(sub),
    }))

    return (
      <Scatter
        data={{
          datasets: [
            {
              label: "Alter vs. SUS-Score",
              data: data,
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              borderColor: "rgb(59, 130, 246)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
              labels: {
                color: "rgb(209, 213, 219)",
              },
            },
            title: {
              display: true,
              text: "Korrelation: Alter und SUS-Score",
              color: "rgb(209, 213, 219)",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "SUS-Score",
                color: "rgb(209, 213, 219)",
              },
              ticks: {
                color: "rgb(209, 213, 219)",
              },
              grid: {
                color: "rgba(75, 85, 99, 0.2)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Alter",
                color: "rgb(209, 213, 219)",
              },
              ticks: {
                color: "rgb(209, 213, 219)",
              },
              grid: {
                color: "rgba(75, 85, 99, 0.2)",
              },
            },
          },
        }}
      />
    )
  }

  switch (selectedVisualization) {
    case "sus-scores":
      return renderSUSScoreDistribution()
    case "demographics":
      return renderDemographics()
    case "correlations":
      return renderCorrelations()
    default:
      return null
  }
} 