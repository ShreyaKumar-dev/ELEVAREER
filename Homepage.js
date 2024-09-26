// **************************************** Trending Job Chart ***************************************************************

// Function to fetch job trends data (using static data from JobHike.json for now)
async function fetchJobData() {
    const response = await fetch('JobHike.json');
    const data = await response.json();
    
    // Sort the data in descending order of opportunities
    data.sort((a, b) => b.Opportunity - a.Opportunity);

    // Extract top 15 job titles and opportunities
    const top15Jobs = data.slice(0, 10);
    
    // Prepare data in the format the chart requires
    const chartData = {
        jobTitles: top15Jobs.map(job => job.Title),
        jobCounts: top15Jobs.map(job => job.Opportunity)
    };
    
    return chartData;
}

// Function to update chart with new data
function updateChart(chart, data) {
    chart.data.labels = data.jobTitles; // Job titles
    chart.data.datasets[0].data = data.jobCounts; // Job opportunities
    chart.update();
}

// Set up the chart
const ctx = document.getElementById('jobChart').getContext('2d');
const jobChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Initially empty
        datasets: [{
            label: 'Trending Jobs',
            data: [], // Initially empty
            backgroundColor: ['#ff5959', '#ffa85b', '#ffd36f', '#7be495', '#3fa2f7', '#6e83f7', '#8b5cf6',
                '#f7b84b', '#f76f8b', '#5b8cfc'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to dynamically fetch and load data into the chart
async function loadChartData() {
    const jobData = await fetchJobData(); // Get the job data
    updateChart(jobChart, jobData); // Update the chart with new data
}

// Load chart data on page load
loadChartData();



// ************************************************************ Job Post Update ****************************************************

// Fetch jobs from API with proper headers
async function fetchJobs() {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'jobs-api19.p.rapidapi.com',
            'x-rapidapi-key': '27075c9329msh6038bffaa255827p1a0afbjsnb85df689e8ff'
        }
    };

    try {
        const response = await fetch('https://jobs-api19.p.rapidapi.com/jobs?limit=10', options);
        const data = await response.json();

        if (data && Array.isArray(data)) {
            displayJobs(data); // Pass the job data to the display function
        } else {
            console.log('No jobs found or incorrect response format.');
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

// Display jobs dynamically in the DOM
function displayJobs(jobs) {
    const jobListingsContainer = document.getElementById('job-listings');
    
    // Clear existing content
    jobListingsContainer.innerHTML = '';

    // Loop through jobs and create job cards
    jobs.forEach(job => {
        const jobCard = `
            <div class="job-card">
                <div class="py-3 px-2 gap-3">
                    <p class="text-dark job-head">${job.job_title}</p>
                    <p class="text-secondary job-company">${job.company}</p>
                    <p class="pb-3 d-flex align-items-center justify-content-center text-secondary job-location">
                        <img src="./asset/location.png" alt="location" height="20px" class="me-2">${job.location}
                    </p>
                    <a href="${job.apply_link}" target="_blank">
                        <button class="text-uppercase apply-job">Apply</button>
                    </a>
                </div>
            </div>
        `;

        // Append job card to job listings container
        jobListingsContainer.innerHTML += jobCard;
    });
}

// Call the fetchJobs function when the page loads
window.onload = fetchJobs;
