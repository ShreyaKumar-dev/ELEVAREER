// ==============================
// JobDetail.js
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    initializeJobDetail();
    initializeChartClickListener();
});

// Function to fetch all job details from job.json
async function fetchAllJobDetails() {
    try {
        const response = await fetch('job.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch job.json: ${response.statusText}`);
        }
        const jobs = await response.json();
        return jobs;
    } catch (error) {
        console.error('Error fetching job.json:', error);
        return [];
    }
}

// Function to get job details by job title (case-insensitive)
function getJobDetailsByTitle(jobs, jobTitle) {
    return jobs.find(job => job.role.toLowerCase() === jobTitle.toLowerCase());
}

// Function to populate and show the modal with job details
function showJobDetailsModal(job) {
    if (!job) {
        console.error('No job details to display.');
        return;
    }

    // Populate the modal fields
    document.getElementById('modal-job-title').textContent = job.role || 'N/A';
    document.getElementById('modal-job-description').textContent = job.description || 'No description available.';

    const jobSkillsElement = document.getElementById('modal-job-skills');
    jobSkillsElement.innerHTML = ''; // Clear existing skills
    if (job.skills && Array.isArray(job.skills)) {
        job.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            jobSkillsElement.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No skills listed.';
        jobSkillsElement.appendChild(li);
    }

    // Update India Location Details
    document.getElementById('modal-india-job-opportunities').textContent = job.locations?.india?.job_opportunities || 'N/A';
    document.getElementById('modal-india-growth').textContent = job.locations?.india?.growth || 'N/A';
    document.getElementById('modal-india-annual-salary').textContent = job.locations?.india?.annual_salary || 'N/A';
    document.getElementById('modal-india-state').textContent = job.locations?.india?.state || 'N/A';

    // Update Foreign Location Details
    document.getElementById('modal-foreign-job-opportunities').textContent = job.locations?.foreign?.job_opportunities || 'N/A';
    document.getElementById('modal-foreign-growth').textContent = job.locations?.foreign?.growth || 'N/A';
    document.getElementById('modal-foreign-annual-salary').textContent = job.locations?.foreign?.annual_salary || 'N/A';
    document.getElementById('modal-foreign-state').textContent = job.locations?.foreign?.state || 'N/A';

    // Show the modal using Bootstrap's Modal API
    const jobDetailsModal = new bootstrap.Modal(document.getElementById('jobDetailsModal'));
    jobDetailsModal.show();
}

// Main function to initialize JobDetail.js
async function initializeJobDetail() {
    // Fetch all job details once and store them
    const jobs = await fetchAllJobDetails();

    if (jobs.length === 0) {
        // Display an error message if job details couldn't be fetched
        console.error('No job details available.');
        return;
    }

    // Listen for the custom 'jobSelected' event
    document.addEventListener('jobSelected', (event) => {
        const selectedJobTitle = event.detail.jobTitle;
        const job = getJobDetailsByTitle(jobs, selectedJobTitle);
        if (job) {
            showJobDetailsModal(job);
        } else {
            console.error(`No job details found for "${selectedJobTitle}".`);
            // Optionally, display a message in the modal
            showJobDetailsModal({
                role: 'Job Details Not Found',
                description: `No details available for "${selectedJobTitle}".`,
                skills: [],
                locations: {
                    india: {
                        job_opportunities: 'N/A',
                        growth: 'N/A',
                        annual_salary: 'N/A',
                        state: 'N/A'
                    },
                    foreign: {
                        job_opportunities: 'N/A',
                        growth: 'N/A',
                        annual_salary: 'N/A',
                        state: 'N/A'
                    }
                }
            });
        }
    });
}

// Function to initialize chart click listener
function initializeChartClickListener() {
    // Listen for the custom 'jobSelected' event dispatched by the chart
    document.addEventListener('jobSelected', (event) => {
        // Additional logic can be handled here if needed
        // Currently, the modal is already being handled in initializeJobDetail
    });
}