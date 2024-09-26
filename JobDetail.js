// ==============================
// JobDetail.js
// ==============================

// Function to fetch all job details from jobs.json
async function fetchAllJobDetails() {
    try {
        const response = await fetch('job.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch jobs.json: ${response.statusText}`);
        }
        const jobs = await response.json();
        return jobs;
    } catch (error) {
        console.error('Error fetching jobs.json:', error);
        return [];
    }
}

// Function to get job details by job title (case-insensitive)
function getJobDetailsByTitle(jobs, jobTitle) {
    return jobs.find(job => job.role.toLowerCase() === jobTitle.toLowerCase());
}

// Function to display job details in the DOM
function displayJobDetails(job) {
    if (!job) {
        console.error('No job details to display.');
        return;
    }

    // Update Job Title
    const jobTitleElement = document.getElementById('job-title');
    jobTitleElement.textContent = job.role || 'N/A';

    // Update Job Description
    const jobDescriptionElement = document.getElementById('job-description');
    jobDescriptionElement.textContent = job.description || 'No description available.';

    // Update Skills
    const jobSkillsElement = document.getElementById('job-skills');
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
    const indiaJobOpportunities = document.getElementById('india-job-opportunities');
    const indiaGrowth = document.getElementById('india-growth');
    const indiaAnnualSalary = document.getElementById('india-annual-salary');
    const indiaState = document.getElementById('india-state');

    indiaJobOpportunities.textContent = job.locations?.india?.job_opportunities || 'N/A';
    indiaGrowth.textContent = job.locations?.india?.growth || 'N/A';
    indiaAnnualSalary.textContent = job.locations?.india?.annual_salary || 'N/A';
    indiaState.textContent = job.locations?.india?.state || 'N/A';

    // Update Foreign Location Details
    const foreignJobOpportunities = document.getElementById('foreign-job-opportunities');
    const foreignGrowth = document.getElementById('foreign-growth');
    const foreignAnnualSalary = document.getElementById('foreign-annual-salary');
    const foreignState = document.getElementById('foreign-state');

    foreignJobOpportunities.textContent = job.locations?.foreign?.job_opportunities || 'N/A';
    foreignGrowth.textContent = job.locations?.foreign?.growth || 'N/A';
    foreignAnnualSalary.textContent = job.locations?.foreign?.annual_salary || 'N/A';
    foreignState.textContent = job.locations?.foreign?.state || 'N/A';
}

// Main function to initialize JobDetail.js
async function initializeJobDetail() {
    // Fetch all job details once and store them
    const jobs = await fetchAllJobDetails();

    if (jobs.length === 0) {
        // Display an error message if job details couldn't be fetched
        document.getElementById('job-title').textContent = 'Error Loading Job Details';
        document.getElementById('job-description').textContent = 'Unable to load job details at this time.';
        return;
    }

    // Listen for the custom 'jobSelected' event
    document.addEventListener('jobSelected', (event) => {
        const selectedJobTitle = event.detail.jobTitle;
        const job = getJobDetailsByTitle(jobs, selectedJobTitle);
        if (job) {
            displayJobDetails(job);
        } else {
            console.error(`No job details found for "${selectedJobTitle}".`);
            // Optionally, display a message in the UI
            document.getElementById('job-title').textContent = 'Job Details Not Found';
            document.getElementById('job-description').textContent = `No details available for "${selectedJobTitle}".`;
            document.getElementById('job-skills').innerHTML = '';
            // Reset location details
            document.getElementById('india-job-opportunities').textContent = 'N/A';
            document.getElementById('india-growth').textContent = 'N/A';
            document.getElementById('india-annual-salary').textContent = 'N/A';
            document.getElementById('india-state').textContent = 'N/A';
            document.getElementById('foreign-job-opportunities').textContent = 'N/A';
            document.getElementById('foreign-growth').textContent = 'N/A';
            document.getElementById('foreign-annual-salary').textContent = 'N/A';
            document.getElementById('foreign-state').textContent = 'N/A';
        }
    });

    // Optionally, display details of the first job by default
    if (jobs.length > 0) {
        displayJobDetails(jobs[0]);
    }
}

// Initialize JobDetail.js when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeJobDetail);
