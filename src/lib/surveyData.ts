// Stack Overflow Developer Survey 2024 — curated data
// Source: https://survey.stackoverflow.co/2024/

export const SURVEY_META = {
  year: 2024,
  respondents: 65_437,
  countries: 185,
}

export const topLanguages = [
  { name: 'JavaScript', pct: 62.3 },
  { name: 'Python', pct: 51.0 },
  { name: 'TypeScript', pct: 38.5 },
  { name: 'Java', pct: 30.3 },
  { name: 'C#', pct: 27.1 },
  { name: 'C++', pct: 23.0 },
  { name: 'PHP', pct: 18.2 },
  { name: 'Go', pct: 13.5 },
  { name: 'Rust', pct: 12.6 },
  { name: 'Kotlin', pct: 9.4 },
  { name: 'Swift', pct: 8.0 },
  { name: 'Ruby', pct: 6.2 },
]

export const mostLovedLanguages = [
  { name: 'Rust', pct: 82.2 },
  { name: 'Elixir', pct: 73.1 },
  { name: 'TypeScript', pct: 71.7 },
  { name: 'Kotlin', pct: 70.1 },
  { name: 'Python', pct: 68.9 },
  { name: 'Go', pct: 67.5 },
  { name: 'Swift', pct: 65.3 },
  { name: 'JavaScript', pct: 59.8 },
  { name: 'C#', pct: 57.4 },
  { name: 'Java', pct: 45.2 },
  { name: 'PHP', pct: 32.1 },
  { name: 'COBOL', pct: 13.5 },
]

export const topFrameworks = [
  { name: 'Node.js', pct: 40.8 },
  { name: 'React', pct: 39.5 },
  { name: '.NET', pct: 28.7 },
  { name: 'Next.js', pct: 17.9 },
  { name: 'Vue.js', pct: 15.4 },
  { name: 'FastAPI', pct: 14.9 },
  { name: 'Angular', pct: 14.4 },
  { name: 'Express', pct: 14.3 },
  { name: 'Django', pct: 12.2 },
  { name: 'Spring Boot', pct: 11.8 },
  { name: 'Flask', pct: 11.1 },
  { name: 'Svelte', pct: 6.5 },
]

export const topDatabases = [
  { name: 'PostgreSQL', pct: 48.7 },
  { name: 'MySQL', pct: 40.3 },
  { name: 'SQLite', pct: 33.1 },
  { name: 'MongoDB', pct: 24.1 },
  { name: 'Redis', pct: 20.4 },
  { name: 'SQL Server', pct: 19.1 },
  { name: 'DynamoDB', pct: 9.5 },
  { name: 'Firebase', pct: 9.2 },
  { name: 'Elasticsearch', pct: 8.4 },
  { name: 'Supabase', pct: 7.3 },
]

export const topCloudPlatforms = [
  { name: 'AWS', pct: 48.0 },
  { name: 'Azure', pct: 28.7 },
  { name: 'Google Cloud', pct: 25.0 },
  { name: 'Cloudflare', pct: 20.0 },
  { name: 'Vercel', pct: 10.8 },
  { name: 'Heroku', pct: 7.3 },
  { name: 'DigitalOcean', pct: 7.3 },
  { name: 'Netlify', pct: 6.5 },
  { name: 'Hetzner', pct: 5.7 },
]

export const aiToolUsage = [
  { name: 'GitHub Copilot', pct: 55.8 },
  { name: 'ChatGPT', pct: 54.6 },
  { name: 'Bing AI / Copilot', pct: 21.6 },
  { name: 'Google Gemini', pct: 19.3 },
  { name: 'Claude', pct: 12.4 },
  { name: 'Tabnine', pct: 7.7 },
  { name: 'AWS CodeWhisperer', pct: 7.3 },
  { name: 'Codeium', pct: 6.8 },
  { name: 'Cursor', pct: 5.5 },
]

export const devTypeDistribution = [
  { name: 'Full-stack', pct: 43.1 },
  { name: 'Backend', pct: 26.6 },
  { name: 'Frontend', pct: 18.4 },
  { name: 'Mobile', pct: 8.9 },
  { name: 'Data Engineer', pct: 7.5 },
  { name: 'DevOps/SRE', pct: 7.2 },
  { name: 'ML/AI Engineer', pct: 6.1 },
  { name: 'Security', pct: 3.7 },
  { name: 'DBA', pct: 2.8 },
]

export const experienceVsSalary = [
  { experience: '0-1 yr', medianUSD: 38_000 },
  { experience: '2-4 yr', medianUSD: 62_000 },
  { experience: '5-9 yr', medianUSD: 88_000 },
  { experience: '10-14 yr', medianUSD: 115_000 },
  { experience: '15-19 yr', medianUSD: 130_000 },
  { experience: '20+ yr', medianUSD: 145_000 },
]

export const topPayingLanguages = [
  { name: 'Rust', medianUSD: 87_013 },
  { name: 'Go', medianUSD: 84_619 },
  { name: 'Scala', medianUSD: 81_176 },
  { name: 'Kotlin', medianUSD: 77_844 },
  { name: 'TypeScript', medianUSD: 74_205 },
  { name: 'Swift', medianUSD: 72_519 },
  { name: 'Python', medianUSD: 70_855 },
  { name: 'Java', medianUSD: 66_003 },
  { name: 'JavaScript', medianUSD: 62_840 },
  { name: 'C#', medianUSD: 62_045 },
  { name: 'PHP', medianUSD: 45_244 },
]

export const workModeTrends = [
  { year: '2020', remote: 11, hybrid: 12, inPerson: 77 },
  { year: '2021', remote: 46, hybrid: 27, inPerson: 27 },
  { year: '2022', remote: 43, hybrid: 42, inPerson: 15 },
  { year: '2023', remote: 42, hybrid: 42, inPerson: 16 },
  { year: '2024', remote: 38, hybrid: 40, inPerson: 22 },
]

export const jobSatisfaction = [
  { label: 'Very satisfied', pct: 22.4, color: '#3ecf8e' },
  { label: 'Slightly satisfied', pct: 35.1, color: '#4f8fff' },
  { label: 'Neutral', pct: 19.8, color: '#6b6b88' },
  { label: 'Slightly dissatisfied', pct: 14.3, color: '#f5c842' },
  { label: 'Very dissatisfied', pct: 8.4, color: '#ff4f4f' },
]

export const osDistribution = [
  { name: 'Windows', pct: 48.1 },
  { name: 'macOS', pct: 31.9 },
  { name: 'Linux', pct: 24.4 },
  { name: 'WSL', pct: 15.2 },
]
