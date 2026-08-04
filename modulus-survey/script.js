// REPLACE THIS WITH YOUR PUBLISHED GOOGLE APPS SCRIPT WEB APP URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzN1ys1A6m6C-Z-FQ6YrH4Q3-wkNxqK2txuzniN8spSLu8XeiG3YEipfDf86IkfgNhe/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('surveyForm');
  const submitBtn = document.getElementById('submitBtn');
  const successOverlay = document.getElementById('successOverlay');
  const closeOverlayBtn = document.getElementById('closeOverlay');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Setup loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting... <span class="spinner"></span>';
    
    // Gather form data
    const formData = new FormData(form);
    const data = {};
    
    data.primaryRole = formData.get('primaryRole');
    data.dailyResponsibilities = formData.get('dailyResponsibilities');
    data.receiveTasks = formData.getAll('receiveTasks');
    data.stepByStepProcess = formData.get('stepByStepProcess');
    data.reportCompletion = formData.get('reportCompletion');
    data.challengesPhotos = formData.getAll('challengesPhotos');
    data.averagePhotos = formData.get('averagePhotos');
    data.safetyProtocols = formData.get('safetyProtocols');
    data.clientApproval = formData.get('clientApproval');
    data.logTools = formData.get('logTools');
    data.emergencyRequests = formData.get('emergencyRequests');
    data.poorInternetFrequency = formData.get('poorInternetFrequency');
    data.externalApps = formData.getAll('externalApps');
    data.bankingActions = formData.get('bankingActions');
    data.sosProtocol = formData.get('sosProtocol');
    data.toolWishlist = formData.get('toolWishlist');
    data.majorHeadache = formData.get('majorHeadache');

    try {
      // Send data as text/plain to avoid CORS preflight constraints in Google Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data)
      });
      
      // Show success
      successOverlay.style.display = 'flex';
      form.reset();
    } catch (error) {
      console.error('Submission Error:', error);
      alert('An error occurred while submitting the form. Please try again or check your connection.');
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Survey';
    }
  });

  closeOverlayBtn.addEventListener('click', () => {
    successOverlay.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
