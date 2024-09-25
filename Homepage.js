// Function to fetch job trends data (simulating with static data, but in real use, this can be fetched dynamically from an API or web scrape)
async function fetchJobData() {
    const response = await fetch('JobHike.json');
    const data = await response.json();
    
    // Sort the data by demand (or any field that indicates ranking), replace 'demand' with your actual field
    const sortedJobs = data.sort((a, b) => b.demand - a.demand);
    
    // Get the top 15 jobs
    const top15Jobs = sortedJobs.slice(0, 10);

    // Create arrays for job titles and counts
    const jobTitles = top15Jobs.map(job => job.title);  // Replace 'title' with the field for job titles
    const jobCounts = top15Jobs.map(job => job.count);  // Replace 'count' with the field for job demand

    return { jobTitles, jobCounts }; // Return the necessary data
}

// Function to update the chart with new data
function updateChart(chart, data) {
    chart.data.labels = data.jobTitles; // Update the labels with job titles
    chart.data.datasets[0].data = data.jobCounts; // Update the dataset with job counts
    chart.update(); // Update the chart
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
            backgroundColor: [
                '#ff5959', '#ffa85b', '#ffd36f', '#7be495', '#3fa2f7', '#6e83f7', '#8b5cf6',
                '#f7b84b', '#f76f8b', '#5b8cfc', '#4df7ab', '#9e69f7', '#5cf69b', '#f7df64', '#f69c5b'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Disable aspect ratio to make it full width
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to dynamically fetch and load data into the chart
async function loadChartData() {
    const jobData = await fetchJobData(); // Fetch the job data
    updateChart(jobChart, jobData); // Update the chart with the new data
}

// Load the initial chart data
loadChartData();

// Simulating a dynamic data fetch every few seconds (optional, but can be adjusted to fit your use case)
setInterval(loadChartData, 5000); // Automatically fetch and update the chart every 5 seconds