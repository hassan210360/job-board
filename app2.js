// Fetch and display jobs
fetch('/jobs')
  .then(response => response.json())
  .then(jobs => {
    const jobList = document.getElementById('job-list');
    jobs.forEach(job => {
      const li = document.createElement('li');
      li.textContent = `${job.title} - ${job.location}`;
      jobList.appendChild(li);

      const jobSelect = document.getElementById('job-select');
      const option = document.createElement('option');
      option.value = job.id;
      option.textContent = job.title;
      jobSelect.appendChild(option);
    });
  });

// Post job
document.getElementById('post-job-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const location = document.getElementById('location').value;

  fetch('/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, location })
  })
  .then(response => response.json())
  .then(data => {
    alert('Job posted successfully');
    location.reload();
  });
});

// Apply for job
document.getElementById('apply-job-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('applicant-name').value;
  const email = document.getElementById('applicant-email').value;
  const job_id = document.getElementById('job-select').value;
  const cv = document.getElementById('cv').files[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('job_id', job_id);
  formData.append('cv', cv);

  fetch('/apply', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert('Application submitted successfully');
  });
});
