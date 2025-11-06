// Firebase Cloud Functions configuration

// Get the Cloud Function URL
// After deployment, this will be: https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predict_tumor
// For local development with emulator: http://127.0.0.1:5001/brain-tumor-system-d402a/us-central1/predict_tumor

const isDevelopment = import.meta.env.DEV;
const projectId = 'brain-tumor-system-d402a';
const region = 'us-central1'; // Change to your preferred region
const functionName = 'predict_tumor';

// Production URL (update after deployment)
const PRODUCTION_URL = `https://${region}-${projectId}.cloudfunctions.net/${functionName}`;

// Local emulator URL
const EMULATOR_URL = `http://127.0.0.1:5001/${projectId}/${region}/${functionName}`;

// Use emulator in development, production URL otherwise
export const PREDICT_TUMOR_URL = isDevelopment ? EMULATOR_URL : PRODUCTION_URL;

// For now, use production URL (update after deployment)
// TODO: After deploying, update this to use the actual deployed URL
export const getPredictTumorUrl = () => {
  // Check if we're using emulator
  if (process.env.USE_FIREBASE_EMULATOR === 'true') {
    return EMULATOR_URL;
  }
  return PRODUCTION_URL;
};

