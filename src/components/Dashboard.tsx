'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts'
import {
  SURVEY_META,
  topLanguages,
  mostLovedLanguages,
  topFrameworks,
  topDatabases,
  topCloudPlatforms,
  aiToolUsage,
  devTypeDistribution,
  experienceVsSalary,
  topPayingLanguages,
  workModeTrends,
  jobSatisfaction,
  osDistribution,
} from '@/lib/surveyData'

const GOLD = '#f5c842'
const BLUE = '#4f8fff'
const GREEN = '#3ecf8e'
const RED = '#ff4f4f'
const MUTED = '#6b6b88'
const BORDER = '#1e1e2e'
const PALETTE = [BLUE, GREEN, GOLD, RED, '#a78bfa', '#fb923c', '#22d3ee', '#f472b6', '#84cc16']

function ChartTooltip({ active, payload, label, suffix = '%' }: {
  active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string; suffix?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0d0d14] border border-[#2e2e42] rounded-xl p-3 text-xs shadow-xl">
      {label && <p className="text-[#f0f0f8] font-semibold mb-1.5">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || BLUE }} className="font-mono">
          {p.name !== 'value' ? `${p.name}: ` : ''}{typeof p.value === 'number' && suffix === '$'
            ? `$${p.value.toLocaleString()}`
            : `${p.value}${suffix}`}
        </p>
      ))}
    </div>
  )
}

function StatCard({ value, label, color = GOLD }: { value: string; label: string; color?: string }) {
  return (
    <div className="bg-surface2 border border-border rounded-2xl p-5">
      <div className="text-3xl font-extrabold tracking-tight" style={{ color }}>{value}</div>
      <div className="text-xs text-muted mt-1 leading-snug">{label}</div>
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0d14] border border-border rounded-2xl p-6">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-fore">{title}</h3>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function HBar({ name, pct, max, color = BLUE }: { name: string; pct: number; max: number; color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-right text-xs text-muted font-mono truncate flex-shrink-0">{name}</div>
      <div className="flex-1 h-6 bg-[#0d0d14] rounded-md overflow-hidden border border-border">
        <div
          className="h-full rounded-md flex items-center px-2 transition-all duration-500"
          style={{ width: `${(pct / max) * 100}%`, backgroundColor: color + '33', border: `1px solid ${color}55` }}
        >
          <span className="text-[10px] font-mono font-bold" style={{ color }}>{pct}%</span>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  { id: 'languages', label: '🔤 Languages' },
  { id: 'frameworks', label: '🧩 Frameworks & DBs' },
  { id: 'ai', label: '🤖 AI Tools' },
  { id: 'salary', label: '💰 Salaries' },
  { id: 'work', label: '🏢 Work & Life' },
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('languages')

  return (
    <div className="max-w-[1200px] mx-auto px-6 pb-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard value={SURVEY_META.respondents.toLocaleString()} label="Developers surveyed" color={GOLD} />
        <StatCard value={`${SURVEY_META.countries}`} label="Countries represented" color={BLUE} />
        <StatCard value="17th" label="Annual survey edition" color={GREEN} />
        <StatCard value="87%" label="Used AI tools in 2024" color={RED} />
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={[
              'px-4 py-2 rounded-xl border text-sm font-semibold transition-all',
              activeTab === t.id
                ? 'border-gold bg-[rgba(245,200,66,0.1)] text-gold'
                : 'border-border bg-[#0d0d14] text-muted hover:text-fore hover:border-muted',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'languages' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Most Used Languages" subtitle="% of devs using this year">
            <div className="space-y-2">
              {topLanguages.map((l) => <HBar key={l.name} name={l.name} pct={l.pct} max={topLanguages[0].pct} color={BLUE} />)}
            </div>
          </Section>
          <Section title="Most Loved Languages" subtitle="% of current users who want to continue">
            <div className="space-y-2">
              {mostLovedLanguages.map((l) => <HBar key={l.name} name={l.name} pct={l.pct} max={100} color={GREEN} />)}
            </div>
          </Section>
          <Section title="OS Distribution" subtitle="Primary OS used for development">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={osDistribution} dataKey="pct" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45} paddingAngle={3}>
                  {osDistribution.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend formatter={(v) => <span className="text-xs text-muted">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Developer Type" subtitle="How devs describe their primary role">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={devTypeDistribution} layout="vertical" margin={{ left: 70, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} horizontal={false} />
                <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} width={70} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pct" fill={GOLD} radius={[0, 4, 4, 0]} name="value" />
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>
      )}

      {activeTab === 'frameworks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Top Frameworks & Libraries" subtitle="% of devs using">
            <div className="space-y-2">
              {topFrameworks.map((f) => <HBar key={f.name} name={f.name} pct={f.pct} max={topFrameworks[0].pct} color={BLUE} />)}
            </div>
          </Section>
          <Section title="Top Databases" subtitle="% of devs using">
            <div className="space-y-2">
              {topDatabases.map((d) => <HBar key={d.name} name={d.name} pct={d.pct} max={topDatabases[0].pct} color={GREEN} />)}
            </div>
          </Section>
          <Section title="Cloud Platforms" subtitle="% of devs using">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={topCloudPlatforms} margin={{ left: 8, right: 8, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} angle={-30} textAnchor="end" />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pct" fill={BLUE} radius={[4, 4, 0, 0]} name="value" />
              </BarChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Framework Radar" subtitle="Relative adoption across top 6 frameworks">
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={topFrameworks.slice(0, 6)}>
                <PolarGrid stroke={BORDER} />
                <PolarAngleAxis dataKey="name" tick={{ fill: MUTED, fontSize: 10 }} />
                <Radar name="Usage %" dataKey="pct" stroke={BLUE} fill={BLUE} fillOpacity={0.2} />
                <Tooltip content={<ChartTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </Section>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="AI Tool Adoption" subtitle="% of devs using in professional workflow">
            <div className="space-y-2">
              {aiToolUsage.map((a, i) => <HBar key={a.name} name={a.name} pct={a.pct} max={aiToolUsage[0].pct} color={PALETTE[i % PALETTE.length]} />)}
            </div>
          </Section>
          <Section title="AI Sentiment" subtitle="Trust & productivity impact">
            <div className="space-y-4 pt-2">
              {[
                { label: 'Believe AI makes them more productive', pct: 81, color: GREEN },
                { label: 'Trust AI output "most of the time"', pct: 43, color: BLUE },
                { label: 'Worried AI will replace their job', pct: 25, color: RED },
                { label: 'Always review AI-generated code', pct: 70, color: GOLD },
                { label: 'Used AI for debugging', pct: 56, color: '#a78bfa' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted">{item.label}</span>
                    <span className="font-bold font-mono" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-[#0d0d14] rounded-full border border-border overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="AI in the Workflow" subtitle="Top use cases for AI tools">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="vertical" data={[
                { task: 'Write code', pct: 72 },
                { task: 'Debug / fix errors', pct: 68 },
                { task: 'Get explanations', pct: 61 },
                { task: 'Write tests', pct: 39 },
                { task: 'Write documentation', pct: 37 },
                { task: 'Learn new tech', pct: 35 },
                { task: 'Code review', pct: 28 },
              ]} margin={{ left: 100, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} horizontal={false} />
                <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <YAxis type="category" dataKey="task" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} width={100} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pct" fill={GREEN} radius={[0, 4, 4, 0]} name="value" />
              </BarChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Did AI speed you up?" subtitle="Self-reported productivity impact">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={[
                  { name: 'Significantly faster', pct: 32 },
                  { name: 'Somewhat faster', pct: 49 },
                  { name: 'No change', pct: 13 },
                  { name: 'Slower', pct: 6 },
                ]} dataKey="pct" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={45} paddingAngle={3}>
                  {[GREEN, BLUE, MUTED, RED].map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend formatter={(v) => <span className="text-xs text-muted">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </Section>
        </div>
      )}

      {activeTab === 'salary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Median Salary by Experience" subtitle="USD, global median across all roles">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={experienceVsSalary} margin={{ left: 8, right: 16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="experience" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip suffix="$" />} />
                <Line type="monotone" dataKey="medianUSD" stroke={GOLD} strokeWidth={2.5} dot={{ fill: GOLD, r: 4 }} activeDot={{ r: 6 }} name="Median USD" />
              </LineChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Top Paying Languages" subtitle="Median annual salary in USD">
            <div className="space-y-2">
              {topPayingLanguages.map((l, i) => (
                <div key={l.name} className="flex items-center gap-3">
                  <div className="w-4 text-right text-[10px] text-muted font-mono flex-shrink-0">{i + 1}</div>
                  <div className="w-24 text-xs text-muted font-mono truncate flex-shrink-0">{l.name}</div>
                  <div className="flex-1 h-6 bg-[#0d0d14] rounded-md overflow-hidden border border-border">
                    <div className="h-full rounded-md flex items-center px-2"
                      style={{ width: `${(l.medianUSD / topPayingLanguages[0].medianUSD) * 100}%`, backgroundColor: GOLD + '22', border: `1px solid ${GOLD}44` }}>
                      <span className="text-[10px] font-mono font-bold text-gold">${(l.medianUSD / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Salary by Country (Top 8)" subtitle="Median USD for full-stack developers">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={[
                { country: 'USA', median: 138_000 },
                { country: 'Israel', median: 117_000 },
                { country: 'Switzerland', median: 112_000 },
                { country: 'Australia', median: 95_000 },
                { country: 'Canada', median: 88_000 },
                { country: 'UK', median: 79_000 },
                { country: 'Germany', median: 76_000 },
                { country: 'India', median: 18_000 },
              ]} margin={{ left: 8, right: 8, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
                <XAxis dataKey="country" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} angle={-30} textAnchor="end" />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip suffix="$" />} />
                <Bar dataKey="median" fill={GREEN} radius={[4, 4, 0, 0]} name="Median USD" />
              </BarChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Compensation by Company Size" subtitle="Median USD across dev roles">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart layout="vertical" data={[
                { size: '2-9', median: 54_000 },
                { size: '10-49', median: 67_000 },
                { size: '50-249', median: 78_000 },
                { size: '250-999', median: 88_000 },
                { size: '1k-4.9k', median: 101_000 },
                { size: '5k+', median: 118_000 },
              ]} margin={{ left: 56, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} horizontal={false} />
                <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="size" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} width={56} />
                <Tooltip content={<ChartTooltip suffix="$" />} />
                <Bar dataKey="median" fill={BLUE} radius={[0, 4, 4, 0]} name="Median USD" />
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>
      )}

      {activeTab === 'work' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Remote Work Trend" subtitle="% of respondents by work arrangement">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={workModeTrends} margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                <XAxis dataKey="year" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Legend formatter={(v) => <span className="text-xs text-muted capitalize">{v}</span>} />
                <Line type="monotone" dataKey="remote" stroke={GREEN} strokeWidth={2} dot={{ r: 3 }} name="remote" />
                <Line type="monotone" dataKey="hybrid" stroke={BLUE} strokeWidth={2} dot={{ r: 3 }} name="hybrid" />
                <Line type="monotone" dataKey="inPerson" stroke={GOLD} strokeWidth={2} dot={{ r: 3 }} name="inPerson" />
              </LineChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Job Satisfaction" subtitle="How happy are developers at work?">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={jobSatisfaction} dataKey="pct" nameKey="label" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                  {jobSatisfaction.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend formatter={(v) => <span className="text-xs text-muted">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Weekly Coding Hours" subtitle="Self-reported hours coding per week">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { range: '< 5h', pct: 5 },
                { range: '5-10h', pct: 9 },
                { range: '11-20h', pct: 18 },
                { range: '21-30h', pct: 22 },
                { range: '31-40h', pct: 27 },
                { range: '41-50h', pct: 12 },
                { range: '50h+', pct: 7 },
              ]} margin={{ left: 8, right: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
                <XAxis dataKey="range" tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: MUTED, fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pct" fill={BLUE} radius={[4, 4, 0, 0]} name="value" />
              </BarChart>
            </ResponsiveContainer>
          </Section>
          <Section title="Learning & Dev Methods" subtitle="How devs prefer to learn new tech">
            <div className="space-y-2 pt-1">
              {[
                { method: 'Online courses / videos', pct: 59 },
                { method: 'Official docs', pct: 52 },
                { method: 'Stack Overflow', pct: 49 },
                { method: 'On-the-job learning', pct: 45 },
                { method: 'Books / e-books', pct: 30 },
                { method: 'Bootcamps', pct: 9 },
                { method: 'University', pct: 14 },
              ].map((item) => (
                <HBar key={item.method} name={item.method} pct={item.pct} max={100} color={GREEN} />
              ))}
            </div>
          </Section>
        </div>
      )}

      <p className="text-center text-xs text-muted mt-8">
        Data from <a href="https://survey.stackoverflow.co/2024/" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">Stack Overflow Developer Survey 2024</a> · {SURVEY_META.respondents.toLocaleString()} respondents
      </p>
    </div>
  )
}
