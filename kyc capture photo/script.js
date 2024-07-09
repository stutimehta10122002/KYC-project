document.addEventListener('DOMContentLoaded', function () {
    const continuePage = document.getElementById('continuePage');
    const capturePage = document.getElementById('capturePage');
    const videoElement = document.getElementById('videoElement');
    const canvasElement = document.getElementById('canvasElement');
    const captureBtn = document.getElementById('captureBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const continueBtn = document.getElementById('continueBtn');
    const instructions = document.getElementById('instructions');
  
    let stream;
    let photo;
  
    // Function to start video stream
    async function startVideo() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
      } catch (err) {
        console.error('Error accessing video stream: ', err);
      }
    }
  
    // Function to stop video stream
    function stopVideo() {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  
    // Event listener for Continue button
    continueBtn.addEventListener('click', function () {
      continuePage.style.display = 'none';
      capturePage.style.display = 'block';
      startVideo();
    });
  
    // Event listener for Capture Photo button
    captureBtn.addEventListener('click', function () {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      photo = canvasElement.toDataURL('image/png');
      videoElement.style.display = 'none';
      captureBtn.style.display = 'none';
      confirmBtn.style.display = 'inline-block';
      retakeBtn.style.display = 'inline-block';
      canvasElement.style.display = 'inline-block';
    });
  
    // Event listener for Confirm button
    confirmBtn.addEventListener('click', function () {
      // Convert the data URL to a Blob
      const blob = dataURItoBlob(photo);
  
      // Convert Blob to ArrayBuffer
      const reader = new FileReader();
      reader.onloadend = function() {
          const arrayBuffer = reader.result;
  
          // Create a Uint8Array from the ArrayBuffer
          const uint8Array = new Uint8Array(arrayBuffer);
  
          // Convert the Uint8Array to base64
          const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
  
          // Send the base64 string to the backend
          sendToBackend(base64String);
      };
      reader.readAsArrayBuffer(blob);
    });
  
    // Function to send the photo data to the backend
    function sendToBackend(base64String) {
      // Make an HTTP POST request to the backend
      fetch('your-backend-url', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ photo: base64String })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Handle the response from the backend
          console.log('Response from backend:', data);
          // For demonstration purposes, let's go back to the Continue page
          capturePage.style.display = 'none';
          continuePage.style.display = 'block';
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle errors
      })
      .finally(() => {
          // Stop the video stream
          stopVideo();
      });
    }
  
    // Event listener for Retake button
    retakeBtn.addEventListener('click', function () {
      videoElement.style.display = 'inline-block';
      captureBtn.style.display = 'inline-block';
      confirmBtn.style.display = 'none';
      retakeBtn.style.display = 'none';
      canvasElement.style.display = 'none';
    });
  
    // Helper function to convert data URI to Blob
    function dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  });