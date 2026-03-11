/**
 * Autonomous Factory - Polyglot Sidecar API Client
 *
 * This client provides the standard interface between the Frontend (React/Tauri)
 * and the Backend (FastAPI). It handles authentication headers and error management.
 */

import { load } from '@tauri-apps/plugin-store'

const SIDECAR_BASE_URL = 'http://127.0.0.1:8765'
const CONFIG_STORE = 'factory-config.json'

export interface HealthResponse {
    status: string
    version: string
}

/**
 * Internal helper to retrieve system credentials from the secure Tauri store.
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
    try {
        const store = await load(CONFIG_STORE, { autoSave: true, defaults: {} })
        const notionKey = (await store.get<string>('NIT_NOTION_KEY')) || ''
        const geminiKey = (await store.get<string>('NIT_GEMINI_KEY')) || ''
        const vaultPath = (await store.get<string>('NIT_VAULT_PATH')) || ''

        return {
            'X-Notion-Key': notionKey,
            'X-Gemini-Key': geminiKey,
            'X-Vault-Path': vaultPath,
        }
    } catch (err) {
        console.error('[Factory Client] Failed to load auth headers:', err)
        return {}
    }
}

/**
 * Professional Request Wrapper
 * Handles status code validation and automatic header injection.
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const authHeaders = await getAuthHeaders()
    const response = await fetch(`${SIDECAR_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': crypto.randomUUID(), // Mandatory for Agency Standard
            ...authHeaders,
            ...options.headers,
        },
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown System Error' }))
        throw new Error(errorData.detail || `Sidecar error [${response.status}]`)
    }

    return response.json() as Promise<T>
}

export const sidecarApi = {
    /**
     * Verifies connectivity with the Python compute engine.
     */
    health: async (): Promise<HealthResponse> => {
        const response = await fetch(`${SIDECAR_BASE_URL}/api/health`)
        if (!response.ok) throw new Error('Compute engine offline')
        return response.json()
    },

    /**
     * Generic command execution. Uses the /api/execute endpoint if available,
     * or can be extended for specific domain routes.
     */
    call: <T>(path: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', body?: any) => 
        request<T>(path, {
            method,
            body: body ? JSON.stringify(body) : undefined
        }),
}
