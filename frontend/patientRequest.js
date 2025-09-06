document.getElementById('patientRequestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const patientRequest = {
      patientName: formData.get('patientName'),
      bloodGroup: formData.get('bloodGroup'),
      location: formData.get('location'),
      urgency: formData.get('urgency'),
      contact: formData.get('contact'),
    };
  
    try {
      const res = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientRequest),
      });
  
      const result = await res.json();
      alert(result.message || 'Patient request submitted successfully!');
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('Error submitting request. Please try again.');
    }
  });
  