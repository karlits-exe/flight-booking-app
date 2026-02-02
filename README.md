# Technical Specifications Document

## 1. Title Page
- **Project Name:** Flight Booking App
- **Version:** 
- **Date:** 1/27/2026
- **Authors:**  Lord Acuña, Kyle Carpizo, Jackielyn Clavaton, Lorenzo Angelo Pira, Karl Rodriguez

## 2. Table of Contents
1. [Introduction](#3-introduction)
2. [Overall Description](#4-overall-description)
3. [Visual Mockup Reference](#5-visual-mockup-reference)
4. [Features](#6-features)
5. [Functional Requirements](#7-functional-requirements)
6. [Non-Functional Requirements](#8-non-functional-requirements)
7. [Data Requirements](#9-data-requirements)
8. [External Interface Requirements](#10-external-interface-requirements)
9. [Glossary](#11-glossary)
10. [Appendices](#12-appendices)

## 3. Introduction
- **Purpose:** Emulate a flight booking system.
- **Scope:** Browse local flights. User registration and login are required to book flights.
- **Definitions, Acronyms, and Abbreviations:** N/A
- **References:** Singapore Airlines

## 4. Overall Description
- **Product Perspective:** The Flight Booking App is a mobile and web application designed to provide users with an intuitive interface to browse and book local flights. It can integrate with airline databases, payment gateways, and user authentication systems. This positions the application as a modular component within a broader travel ecosystem, enabling interoperability with other travel services, such as hotel booking platforms and loyalty programs.
- **Product Functions:** The primary functionalities of the application include:
   - **Flight Search:** Users can search for flights based on departure and destination locations, dates, and passenger count.
   - **User Account Management:** Users can register, log in, and manage their personal profiles.
   - **Flight Booking:** Users can select flights, choose seating preferences, and complete bookings.
   - **Booking History:** Users can view past bookings and cancellations.
- **User Classes and Characteristics:**
   - **Guest Users:** Users who can browse flights but must register or log in to complete a booking.
   - **Registered Users:** Individuals who create an account to book flights and manage bookings. They require a secure login and access to personal booking history.
   - **Administrators:** System administrators responsible for maintaining flight data, monitoring bookings, and managing user accounts.
- **Operating Environment:**
   - **Hardware:** Smartphones, tablets, and desktop computers.
   - **Software:** Compatible with modern browsers (Chrome, Firefox, Safari) and mobile OS platforms (iOS, Android).
   - **Network:** Internet connectivity is required for real-time flight searches, booking confirmation, and payment processing.
- **Assumptions and Dependencies:**
   - Users are expected to have an active internet connection and a compatible device.
   - The system will comply with standard security protocols to protect user data and transactions.

## 5. Visual Mockup Reference
- **Link:** [Figma](https://www.figma.com/design/Kq2DVtT49QCoOQa8mrmf2d/Flight-Booking-App-Mockup?node-id=0-1&p=f&t=dWs9CJJO2PM4AHJK-0)

## 6. Features
- **Feature 1: Flight Search**
   - Users can search for local flights by specifying departure and destination locations, travel dates, and the number of passengers. Search results are displayed with flight details such as airline, departure/arrival times, duration, and price.

- **Feature 2: Search Filtering and Sorting**
   - Users can filter flight results by price, departure time, duration, and airline, or sort them according to their preferences for a streamlined booking experience.

- **Feature 3: User Registration and Login**
   - New users can register with email and password, while returning users can securely log in. User authentication ensures that personal data and booking history are protected.

- **Feature 4: Flight Booking**
   - Registered users can select flights, choose seating preferences if available, and proceed to booking. The system confirms seat availability in real time before completing the reservation.

- **Feature 5: Booking Management**
   - Users can view, modify, or cancel their bookings. The app provides a booking history, including past flights, receipts, and transaction details.

## 7. Functional Requirements
### Use Cases
- **Use Case 1**
  - **Title:** Flight Search
  - **Description:** Allows users to search for available local flights.
  - **Actors:** Registered or Guest User
  - **Preconditions:** User is logged in or on the search page.
  - **Postconditions:** System displays a list of matching flights.
  - **Main Flow:**
     1. User inputs departure, destination, travel dates, and passenger count.
     2. System retrieves matching flight options.
     3. System displays results with airline, time, duration, and price.
  - **Alternate Flows:**
     - If no flights are available, the system displays a "no results" message.

- **Use Case 2**
  - **Title:** User Registration
  - **Description:** Allows a new user to create an account to access the app’s booking features.
  - **Actors:** Guest User
  - **Preconditions:** User is on the registration page.
  - **Postconditions:** User account is created and stored in the system.
  - **Main Flow:**
     1. User navigates to the registration page.
     2. User enters required details (name, email, password).
     3. System validates inputs.
     4. System stores account details and confirms registration.
  - **Alternate Flows:**
     - If the email is already registered, the system notifies the user.
     - If input validation fails, the system prompts the user to correct errors.

- **Use Case 3**
  - **Title:** User Login
  - **Description:** Allows registered users to access their accounts.
  - **Actors:** Registered User
  - **Preconditions:** User has a registered account.
  - **Postconditions:** User is logged in and can access the app features.
  - **Main Flow:**
     1. User navigates to the login page.
     2. User enters email and password.
     3. System validates credentials.
     4. System grants access to the user dashboard.
  - **Alternate Flows:**
     - If credentials are incorrect, the system displays an error message.
   
- **Use Case 3**
  - **Title:** Flight Booking Simulation
  - **Description:** Allows registered users to simulate booking a flight.
  - **Actors:** Registered User
  - **Preconditions:** User has selected a flight.
  - **Postconditions:** Booking is saved in the system and confirmation is displayed.
  - **Main Flow:**
     1. User selects a flight from search results.
     2. User confirms booking details.
     3. System stores booking and displays confirmation.
  - **Alternate Flows:**
     - User cancels booking before confirmation; system discards the transaction.

### System Features
- **Feature 1**
  - **Description:** Flight Search
  - **Priority:** High
  - **Inputs:** Departure, destination, travel dates, number of passengers.
  - **Processing:** System queries the flight database and filters results based on inputs.
  - **Outputs:** List of flights matching search criteria, showing airline, time, duration, and price.
  - **Error Handling:** Display a message if no flights match the search criteria.
 
- **Feature 2**
  - **Description:** User Account Management
  - **Priority:** High
  - **Inputs:** User email, password, and personal details.
  - **Processing:** Validate inputs, create/update account, and store data securely.
  - **Outputs:** Confirmation of registration, login, or profile update.
  - **Error Handling:** Display validation errors for incorrect inputs or duplicate email.
 
- **Feature 3**
  - **Description:** Flight Booking Simulation
  - **Priority:** Medium
  - **Inputs:** Selected flight details and user confirmation.
  - **Processing:** Store booking data in the system.
  - **Outputs:** Booking confirmation page with flight summary.
  - **Error Handling:** Display a message if the booking process fails or the user cancels.
 
- **Feature 4**
  - **Description:** Booking History
  - **Priority:** Medium
  - **Inputs:** User login credentials.
  - **Processing:** Retrieve all bookings associated with the user.
  - **Outputs:** List of past and active bookings with details.
  - **Error Handling:** Display a message if no bookings exist.

## 8. Non-Functional Requirements
**Performance**
- The system should respond to flight search queries within 2 seconds under normal load (up to 100 concurrent users).
- Booking simulations and account management actions should complete within 3 seconds.
- The application should handle at least 500 simultaneous users without degradation in performance.

**Security**
- User passwords must be stored securely using hashed and salted encryption.
- All sensitive operations (login, registration, profile updates) must be transmitted over HTTPS.
- The system must prevent common security vulnerabilities such as SQL injection, XSS, and CSRF.
- Only authenticated users can access booking history and simulate bookings.

**Usability**
- The interface must be intuitive, with clearly labelled forms and buttons.
- Flight search, booking simulation, and account management should require no more than 3 clicks to complete primary tasks.
- The system must provide real-time feedback for errors or invalid inputs.
- The design should be responsive, compatible with desktop, tablet, and mobile devices.

**Reliability**
- The system must have an uptime of 99% during operational hours.
- All data entries (user accounts, simulated bookings) must be persistently stored and recoverable in case of system failure.
- The system should include basic logging for actions such as registration, login, and bookings to support troubleshooting.

## 9. Data Requirements
- **Data Models:** Include simple diagrams if possible.
- **Database Requirements:**
  - **User Table:** Stores registered user information. Each user has a unique user_id.
  - **Flight Table:** Stores flight details available for booking. Each flight has a unique flight_id.
  - **Booking Table:** Links users to flights for their bookings. Each booking references one user and one flight.
- **Data Storage and Retrieval:**
  - Data will be stored in a relational database.
  - Queries will include:
    - Retrieving available flights based on search criteria.
    - Fetching a user’s booking history.
    - Inserting new bookings into the system.
    - Updating or deleting bookings.

## 10. External Interface Requirements
- **User Interfaces:** Provide sketches or descriptions of the user interface.
- **API Interfaces:** Briefly describe any APIs.
- **Hardware Interfaces:** Mention any required hardware interactions.
- **Software Interfaces:** Note any software interactions.

## 11. Glossary
- **Term 1:** Definition
- **Term 2:** Definition

## 12. Appendices
- **Supporting Information:** Add any additional information here.
- **Revision History:** Record any changes made to the document with dates and descriptions.
