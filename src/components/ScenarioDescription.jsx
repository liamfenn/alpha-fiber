import React from 'react';

const ScenarioDescription = ({ onStart }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'left',
      color: 'black',
      maxWidth: '600px',
      width: '90%',
    }}>
      <h2 style={{ textAlign: 'center' }}>Scenario Description</h2>
      <p>You are a medical resident in the Intensive Care Unit (ICU) of a busy urban hospital. A 65-year-old patient, Mr. Johnson, has been admitted with severe pneumonia and is showing signs of respiratory distress.</p>
      <p><strong>Patient Condition:</strong> Mr. Johnson's oxygen saturation is low, and he's having difficulty breathing. He has a history of hypertension and diabetes.</p>
      <p><strong>Hospital Environment:</strong> You are in a well-equipped ICU room with modern monitoring devices and necessary medical equipment.</p>
      <p><strong>Objectives:</strong></p>
      <ul>
        <li>Assess the patient's condition using available medical records and equipment.</li>
        <li>Determine the appropriate course of action based on your assessment.</li>
        <li>Make a prescription recommendation to stabilize the patient's condition.</li>
      </ul>
      <button 
        onClick={onStart}
        style={{
          display: 'block',
          margin: '20px auto 0',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Start Simulation
      </button>
    </div>
  );
};

export default ScenarioDescription;

