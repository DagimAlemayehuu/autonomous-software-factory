import signal
import sys
import os
import asyncio
from contextlib import asynccontextmanager
from typing import List, Dict, Any, Optional

import uvicorn
from fastapi import FastAPI, Depends, Header, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

# Define a generic AppSecrets dependency for the template
class AppSecrets:
    def __init__(
        self,
        notion_key: Optional[str] = None,
        gemini_key: Optional[str] = None,
        vault_path: Optional[str] = None,
    ):
        self.notion_key = notion_key
        self.gemini_key = gemini_key
        self.vault_path = vault_path

async def get_app_secrets(
    x_notion_key: Optional[str] = Header(None),
    x_gemini_key: Optional[str] = Header(None),
    x_vault_path: Optional[str] = Header(None),
) -> AppSecrets:
    return AppSecrets(
        notion_key=x_notion_key,
        gemini_key=x_gemini_key,
        vault_path=x_vault_path
    )

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifespan events."""
    print("[Sidecar] Starting up...")
    yield
    print("[Sidecar] Shutting down...")

app = FastAPI(
    title="Polyglot Sidecar API",
    description="Generic FastAPI sidecar for processing business logic and background tasks.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS: Configured for Tauri and Local Dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "tauri://localhost",
        "http://localhost:1420",
        "http://127.0.0.1:1420",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    """Standard health check."""
    return {"status": "ok", "version": "1.0.0"}

def handle_shutdown(signum, frame):
    """Clean shutdown handler."""
    print(f"[Sidecar] Received signal {signum}. Exiting cleanly.")
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGTERM, handle_shutdown)
    signal.signal(signal.SIGINT, handle_shutdown)

    host = os.environ.get("API_HOST", "127.0.0.1")
    port = int(os.environ.get("API_PORT", "8765"))

    print(f"[Sidecar] Listening on {host}:{port}")

    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True, # Enabled for template development
        log_level="info",
    )
