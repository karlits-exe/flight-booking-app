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

### System Features
- **Feature 1:**
  - **Description:** 
  - **Priority:** 
  - **Inputs:** 
  - **Processing:** 
  - **Outputs:** 
  - **Error Handling:** 

## 8. Non-Functional Requirements
- **Performance:** Describe performance requirements.
- **Security:** Outline security needs.
- **Usability:** Detail user interface and experience considerations.
- **Reliability:** Define reliability and availability requirements.
- **Supportability:** Specify maintenance and support requirements.

## 9. Data Requirements
- **Data Models:** Include simple diagrams if possible.
- **Database Requirements:** Describe tables and relationships.
- **Data Storage and Retrieval:** Explain how data will be stored and accessed.

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
