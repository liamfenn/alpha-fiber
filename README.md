User Controls Onboarding                                                                   US 101
As a user, I want to see cards explaining the controls so that I can understand how to interact with the simulation.
Acceptance Criteria:
Cards explaining the controls are presented during onboarding.
Each control is described clearly with text and visuals.
User can navigate through the cards at their own pace.
‘Next’ button is provided to move through the explanations.

Functions:
renderOnboardingCards(cardsData): Displays a set of cards with text and visuals for each control.
handleNextCard(): Advances to the next card when the user clicks 'Next'.
handleCardNavigation(index): Allows users to navigate between cards manually.
displayControlVisuals(controls): Renders visuals of the controls (e.g., images or 3D models).
completeOnboarding(): Marks onboarding as complete and transitions to the next phase.


Scenario Overview Video                                                                        US 102
As a user, I want to watch an embedded video of the scenario so that I can understand the context before beginning.
Acceptance Criteria:
A video explaining the scenario is available before the scenario starts.
Video plays automatically or has a “Play” button.
User can pause, play, and skip the video.
Video provides an overview of the case and expectations.


Scenario Description                                                                  US 103
As a user, I want a description of the scenario provided so that I am aware of the situation I’ll be simulating.
Acceptance Criteria:
A written scenario description is provided before entering the simulation.
Description includes relevant details (patient condition, hospital environment, objectives).
The scenario description is clear and concise.

Functions:
renderScenarioDescription(descriptionData): Displays the scenario description with patient condition, objectives, etc.
startScenario(): Starts the simulation once the user acknowledges the scenario description.


Meet Medical Team                                                                         US 104
As a user, I want to meet with the medical team (nurse, doctor, hospital staff) so that I can receive critical information from them.
Acceptance Criteria:
User is introduced to medical team members (nurse, doctor, staff).
Dialogue from the team provides context on the patient’s condition and task expectations.
Team members have distinct roles (doctor gives a medical overview, nurse provides patient history, etc.).


Medical Staff Briefing                                                                     US 105
As a user, I want to be briefed and communicated with by the medical staff so that I can understand my role and responsibilities.
Acceptance Criteria:
Briefing is provided through dialogue or pop-up text explaining the user’s role.
Key responsibilities and expected actions are clearly outlined.
Information is concise and relevant to the task ahead.


Enter ICU Room                                                                         US 106
As a user, I want to enter a specified hospital room so that I can assess the situation firsthand.
Acceptance Criteria:
User is directed to a specific hospital room.
Room is accurately modeled with medical equipment and a realistic patient is visible.
User has freedom to move around the room and inspect the environment.


View Medical Records and Equipment                                                                    US 107
As a user, I want to be prompted to look around and view the medical records and equipment so that I can gather information from the patient monitor and visual cues from the patient.
Acceptance Criteria:
User is prompted to examine medical records (charts, monitor, patient data).
Visual cues from the patient (e.g., breathing, skin color) are noticeable.
Prompt appears guiding user to relevant medical information in the environment.

Functions:
renderMedicalRecords(recordsData): Displays charts and patient data.
renderEquipment(equipmentData): Displays interactive medical equipment (e.g., patient monitor).
highlightVisualCues(): Highlights specific visual cues from the patient (e.g., breathing patterns, skin color).
promptUserAction(actionType): Prompts the user to look at specific equipment or records.
trackUserInteraction(): Tracks which items the user has examined for completion of this user story.


Decision-Making Using Tools and Notepad                                                                   US 108
As a user, I want to come to a decision using the notepad, items in the space, and tools on the menu bar so that I can carefully assess the situation.
Acceptance Criteria:
User can interact with tools (notepad, diagnostic devices, etc.) to make an informed decision.
Menu bar provides access to relevant information (e.g., patient history, test results).
Decision-making process is supported with accessible items in the space.


Make Prescription Recommendation                                                            US 109
As a user, I want to be able to make a prescription recommendation based on the scenario I have viewed, to simulate real-time decision-making.
Acceptance Criteria:
User is prompted to make a prescription recommendation upon completion of inspection of the environment and patient.
A selection tool is provided to choose from a list of prescriptions.
User can confirm or change the recommendation at any time during the initial stage.

Functions:
renderPrescriptionOptions(prescriptions): Displays a list of prescription options.
selectPrescription(option): Allows the user to select a prescription from the list.
confirmRecommendation(): Confirms the user's choice and locks it in or allows them to revise it.
validatePrescriptionSelection(): Ensures the user has inspected all necessary items before submitting a recommendation


Submit Prescription Decision to Medical Staff
US 110
As a user, I want to take my decision back to the medical staff.
Acceptance Criteria:
User is prompted to exit the ICU room to give their recommendation to the medical team.


Review Patient Condition After Decision                                                                     US 111
As a user, I want to return to the hospital room to view the patient’s condition after my decision so that I can see the outcome of my intervention.
Acceptance Criteria:
User can return to the hospital room after presenting a decision to the staff in the lobby.
Patient condition reflects the outcome of the decision (improvement, deterioration, no change).
Visual and data cues on patient monitors reflect changes.


Review Alternative Options                                                                                             US 112
As a user, I want to view alternative options so that I can reflect on what other actions I could have taken.
Acceptance Criteria:
User is presented with alternative options they could have chosen.
Alternatives are explained in terms of their potential outcomes.
User can explore how different choices might have impacted the patient’s condition.

-----------------------------------------------------------------------------

Additional Shared Functions:
loadAssets(assetType): Loads any 3D models, textures, or UI elements necessary for the scene.
transitionToNextPhase(): Moves the user to the next phase of the simulation after completing each task (e.g., onboarding, scenario description, etc.).


