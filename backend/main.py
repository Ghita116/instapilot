from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from pydantic import BaseModel
import uvicorn
import uuid
from datetime import datetime
from typing import Dict, Optional
from scraper import scrape_instagram_profile
import asyncio
from concurrent.futures import ThreadPoolExecutor
from contextlib import asynccontextmanager

# Create a thread pool for running sync scraping operations
thread_pool = ThreadPoolExecutor(max_workers=4)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler for FastAPI application
    """
    # Startup
    yield
    # Shutdown
    thread_pool.shutdown(wait=True)


app = FastAPI(
    title="Instagram Profile Scraper",
    description="A simple API to process Instagram profile URLs",
    version="1.0.0",
    lifespan=lifespan,
)


class InstagramURL(BaseModel):
    url: str


class Job(BaseModel):
    id: str
    url: str
    session_id: str
    status: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    result: Optional[dict] = None
    error: Optional[str] = None


# In-memory database for jobs
jobs_db: Dict[str, Job] = {}


async def run_scraping_in_thread(
    profile_url: str, num_posts: int = 10
) -> Optional[dict]:
    """
    Run the synchronous scraping function in a thread pool
    """
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(
        thread_pool, scrape_instagram_profile, profile_url, num_posts
    )


async def process_scraping_job(job_id: str, profile_url: str, num_posts: int = 10):
    """
    Background task to process the Instagram scraping job
    """
    job = jobs_db[job_id]
    try:
        # Update job status to processing
        job.status = "processing"
        print(f"Starting job {job_id} for URL: {profile_url}")  # Debug log

        # Run the scraping function in a thread pool
        result = await run_scraping_in_thread(profile_url, num_posts)

        if result:
            # Update job with success
            job.status = "completed"
            job.completed_at = datetime.now()
            job.result = result
            print(f"Job {job_id} completed successfully")  # Debug log
        else:
            # Update job with failure
            job.status = "failed"
            job.error = "Scraping failed - no result returned"
            print(f"Job {job_id} failed - no result returned")  # Debug log

    except Exception as e:
        # Update job with error
        job.status = "failed"
        job.error = str(e)
        print(f"Error processing job {job_id}: {str(e)}")
        print(f"Full error details: {type(e).__name__}: {str(e)}")  # Debug log


@app.get("/")
async def root():
    return {"message": "Welcome to Instagram Profile Scraper API"}


@app.post("/get")
async def get_instagram_profile(
    profile: InstagramURL, request: Request, background_tasks: BackgroundTasks
):
    # Generate a unique session ID if not present
    session_id = request.cookies.get("session_id", str(uuid.uuid4()))

    # Check for existing jobs in this session
    existing_jobs = [job for job in jobs_db.values() if job.session_id == session_id]

    # Check for pending or processing jobs
    active_jobs = [
        job for job in existing_jobs if job.status in ["pending", "processing"]
    ]
    if active_jobs:
        raise HTTPException(
            status_code=400,
            detail="You already have an active job. Please wait for it to complete.",
        )

    # Check for completed jobs
    completed_jobs = [job for job in existing_jobs if job.status == "completed"]
    if completed_jobs:
        raise HTTPException(
            status_code=400,
            detail="You have already submitted a job in this session. Please start a new session to submit another job.",
        )

    # Create a new job
    job_id = str(uuid.uuid4())
    job = Job(
        id=job_id,
        url=profile.url,
        session_id=session_id,
        status="pending",
        created_at=datetime.now(),
    )

    # Store the job in our in-memory database
    jobs_db[job_id] = job

    # Add the scraping task to background tasks
    background_tasks.add_task(process_scraping_job, job_id, profile.url, 1)

    return {
        "job_id": job_id,
        "session_id": session_id,
        "status": job.status,
        "message": "Job submitted successfully. Use the job_id to check status.",
    }


@app.get("/jobs/{job_id}")
async def get_job_status(job_id: str):
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    return jobs_db[job_id]


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
