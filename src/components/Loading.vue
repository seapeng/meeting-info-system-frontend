<template>
    <div v-if="isLoading" class="overlay">
      <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="loading-text">Please wait, loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      // isLoading prop controls the visibility of the overlay
      isLoading: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Full-screen overlay styling */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensure it appears on top of other content */
  }
  
  /* Centered spinner and text */
  .spinner-container {
    text-align: center;
    color: white;
  }
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  
  .loading-text {
    margin-top: 20px;
    font-size: 1.25rem;
    font-weight: bold;
  }
  </style>