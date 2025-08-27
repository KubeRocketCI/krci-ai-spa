"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Rocket } from "lucide-react"

interface TimelineMilestone {
  id: string
  title: string
  date: string
  status: 'completed' | 'current' | 'upcoming'
  description: string
  icon: React.ReactNode
  isKubeRocketCI?: boolean
}

interface HorizontalTimelineProps {
  milestones: TimelineMilestone[]
  className?: string
}

export function HorizontalTimeline({ milestones, className = "" }: HorizontalTimelineProps) {
  // Calculate current progress based on strategic timeline
  const calculateCurrentProgress = () => {
    // Since we're in Aug 2025 and MVP was completed in Aug 2025,
    // we're right at the transition to Platform Integration phase
    // Position rocket between MVP (Aug 2025) and KubeRocketCI Integration (Sep 2025)
    return 35 // ~35% puts us right after MVP completion
  }

  const currentProgress = calculateCurrentProgress()
  const currentDateLabel = "Aug 2025"

  return (
    <div className={`w-full bg-black/50 border border-cyan-500/20 rounded-2xl p-4 sm:p-8 ${className}`}>
      <div className="relative pt-8">
        {/* Main timeline line - desktop only */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-slate-700 via-cyan-500/50 to-purple-500/50 hidden sm:block z-0"></div>

        {/* Progress line - animated, desktop only */}
        <motion.div
          className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 rounded-full hidden sm:block z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Current date rocket indicator - desktop horizontal position */}
        <motion.div
          className="absolute z-20 top-2 hidden sm:block"
          style={{ left: `${currentProgress}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <div className="relative transform -translate-x-1/2">
            <motion.div
              className="bg-cyan-400 text-black p-2 rounded-full shadow-lg shadow-cyan-400/50"
              animate={{
                y: [-2, 2, -2],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <Rocket className="w-4 h-4" />
            </motion.div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-black/90 border border-cyan-400/50 rounded-lg px-3 py-1 text-xs text-cyan-300 whitespace-nowrap">
                {currentDateLabel} - Now
              </div>
            </div>
          </div>
        </motion.div>


        {/* Milestones - horizontal on desktop, vertical on mobile */}
        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start items-center pt-8 space-y-8 sm:space-y-0">
          {milestones.map((milestone, index) => {
            const isCompleted = milestone.status === 'completed'
            const isCurrent = milestone.status === 'current'
            const isKubeRocketCI = milestone.isKubeRocketCI

            return (
              <motion.div
                key={milestone.id}
                className="relative flex sm:flex-col flex-row sm:items-center items-start w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {/* Milestone node */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 sm:mb-0 mb-0 sm:mr-0 mr-4
                  ${isCompleted
                    ? 'bg-green-500/20 border-2 border-green-400'
                    : isCurrent
                      ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-400/30'
                      : 'bg-slate-700/30 border-2 border-slate-500'
                  }
                  ${isKubeRocketCI ? 'ring-4 ring-orange-400/40' : ''}
                `}>
                  <div className={`
                    ${isCompleted
                      ? 'text-green-400'
                      : isCurrent
                        ? 'text-cyan-400'
                        : 'text-slate-400'
                    }
                    ${isKubeRocketCI ? 'drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]' : ''}
                  `}>
                    {milestone.icon}
                  </div>

                  {/* KubeRocketCI highlight indicator */}
                  {isKubeRocketCI && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  )}
                </div>

                {/* Milestone info */}
                <div className="sm:mt-4 mt-0 sm:text-center text-left sm:max-w-32 max-w-none flex-1">
                  <div className={`text-sm font-semibold mb-1
                    ${isCompleted
                      ? 'text-green-300'
                      : isCurrent
                        ? 'text-cyan-300'
                        : 'text-slate-400'
                    }
                  `}>
                    {milestone.title}
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {milestone.date}
                  </div>
                  <Badge className={`text-xs
                    ${isCompleted
                      ? 'bg-green-900/30 text-green-300 border-green-700'
                      : isCurrent
                        ? 'bg-cyan-900/30 text-cyan-300 border-cyan-700'
                        : 'bg-slate-800/30 text-slate-400 border-slate-600'
                    }
                  `}>
                    {milestone.status === 'completed' ? 'COMPLETED' :
                      milestone.status === 'current' ? 'EXECUTING' : 'PLANNED'}
                  </Badge>

                  {/* Description shown inline on mobile */}
                  <div className="sm:hidden block mt-2">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Description tooltip on hover - desktop only */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none hidden sm:block">
                  <div className="bg-black/90 border border-cyan-500/30 rounded-lg p-3 text-xs text-slate-300 max-w-48 text-center backdrop-blur-sm">
                    {milestone.description}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
