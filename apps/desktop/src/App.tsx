import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sidecarApi } from '@/lib/sidecarApi'
import { ThemeProvider } from '@/context/theme-provider'
import { ConfigProvider, useConfig } from '@/lib/ConfigContext'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

// Routes
import Dashboard from '@/routes/dashboard'
import Onboarding from '@/routes/onboarding'
import Settings from '@/routes/settings'

function SidecarGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  useEffect(() => {
    const check = async () => {
      try {
        const res = await sidecarApi.health()
        if (res.status === 'ok') {
          setStatus('connected')
        }
      } catch {
        setTimeout(check, 2000)
      }
    }
    check()
  }, [])

  if (status === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white font-mono text-[10px] tracking-[0.3em]">
        CONNECTING_TO_SIDECAR...
      </div>
    )
  }

  return <>{children}</>
}

function ConfigGate({ children }: { children: React.ReactNode }) {
    const { isConfigured, isLoading } = useConfig()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isConfigured) {
            navigate('/onboarding')
        }
    }, [isConfigured, isLoading, navigate])

    if (isLoading) return null

    return <>{children}</>
}

export default function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <SidecarGate>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Protected Routes */}
              <Route element={<ConfigGate><AuthenticatedLayout /></ConfigGate>}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </SidecarGate>
      </ConfigProvider>
    </ThemeProvider>
  )
}
