const videoElement = document.getElementById("videoElement");
const startButton = document.getElementById("startButton");
const captureAadharButton = document.getElementById("captureAadharButton");
const capturePanButton = document.getElementById("capturePanButton");
const captureSignatureButton = document.getElementById("captureSignatureButton");
const continueButton = document.getElementById("continueButton");

let stream;
let aadharImageData;
let panImageData;
let SignatureImageData;


startButton.addEventListener("click", startVideo);
captureAadharButton.addEventListener("click", captureAadharPicture);
capturePanButton.addEventListener("click", capturePanPicture);
captureSignatureButton.addEventListener("click", captureSignaturePicture);
continueButton.addEventListener("click", storeCapturedImages);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (mediaStream) {
      stream = mediaStream;
      videoElement.srcObject = mediaStream;
      startButton.style.display = "none";
      captureAadharButton.style.display = "block";
    })
    .catch(function (error) {
      console.log("Error accessing video stream: ", error);
    });
}

function captureAadharPicture() {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  aadharImageData = canvas.toDataURL('image/jpeg');
  console.log("Aadhar Picture Captured:", aadharImageData);
  captureAadharButton.style.display = "none";
  capturePanButton.style.display = "block";
}

function capturePanPicture() {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  panImageData = canvas.toDataURL('image/jpeg');
  console.log("PAN Picture Captured:", panImageData);
  capturePanButton.style.display = "none";
  captureSignatureButton.style.display = "block";
}

function captureSignaturePicture() {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    SignatureImageData = canvas.toDataURL('image/jpeg');
    console.log("Signature Picture Captured:", SignatureImageData);
    captureSignatureButton.style.display = "none";
    continueButton.style.display = "block";
  }
  


function storeCapturedImages() {
  // Store captured images locally or perform any other desired operation
  console.log("Storing captured images locally...");
  // For demonstration, you can store the data in browser's local storage
  localStorage.setItem('aadharImageData', aadharImageData);
  localStorage.setItem('panImageData', panImageData);
  localStorage.setItem('SignatureImageData', SignatureImageData);
  alert("Images captured successfully and stored locally!");
}