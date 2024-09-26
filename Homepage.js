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
            backgroundColor: ['#ff5959', '#ffa85b', '#ffd36f', '#7be495', '#3fa2f7', '#6e83f7', '#8b5cf6', '#f7b84b', '#f76f8b', '#5b8cfc'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const jobTitle = jobChart.data.labels[index];

                // Trigger a custom event 'jobSelected' with the clicked job title
                const jobSelectedEvent = new CustomEvent('jobSelected', { detail: { jobTitle } });
                document.dispatchEvent(jobSelectedEvent);
                console.log('jobSelected event dispatched with:', jobTitle); 
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
