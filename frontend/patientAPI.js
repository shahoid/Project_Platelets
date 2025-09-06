async function fetchPatientRequests() {
    const res = await fetch('/api/patients');
    const data = await res.json();
  
    const patientListContainer = document.getElementById('patientRequestsList');
    patientListContainer.innerHTML = '';
  
    data.forEach(patient => {
      const patientCard = `
        <div class="patient-card">
          <h3>${patient.patientName}</h3>
          <p>Blood Group: ${patient.bloodGroup}</p>
          <p>Urgency: ${patient.urgency}</p>
          <p>Location: ${patient.location}</p>
          <p>Status: ${patient.status}</p>
        </div>
      `;
      patientListContainer.innerHTML += patientCard;
    });
  }
  
  document.addEventListener('DOMContentLoaded', fetchPatientRequests);
  