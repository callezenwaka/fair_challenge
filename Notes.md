# Engineering task: Full-Stack Development

# TASK 1 - ‘REMIND ME’ (BACKEND ORIENTED)

### **OVERVIEW**

Each collection at Fair.xyz has a specific launch date. When Fair.xyz users visit the page of a specific collection, one of the nice-to-have features is to ‘be reminded of’ when the collection is going live. In this task we will implement a simple ‘REMIND ME’ functionality for displayed collections.

### **IMPLEMENTATION**

The way in which the ‘REMIND ME’ functionality works is as following:

:white_check_mark: - When clicking the button, a modal opens. In it we will ask the user to enter their email where we will send them the reminder<br/>
:white_check_mark: - When clicking confirm, an email will be sent to that person on 3 occasions: 1 day before the launch date, 1 hour before the launch date and when the launch date arrives<br/>
:white_check_mark: - The text in the emails sent before the launch date should be: `REMINDER - THE COLLECTION <COLLECTION_NAME> LAUNCHES IN <TIME (30 mins / 1h / 1day)>`<br/>
:white_check_mark: - The text in the emails sent when launch date arrives should be: `<COLLECTION_NAME> IS LAUNCHING NOW!`<br/>

### TASK DESCRIPTION

:white_check_mark: - You should define at least 6 dummy collections, some of them with a launch date TBD and some of them with a specific launch date. They can be hardcoded in the frontend.<br/>
:white_check_mark: - Each collection should have 2 fields: Name (string) and launchDate, which includes day and time of launch (Date | null).<br/>
:white_check_mark: - The launch date and the name can be editable from the frontend (the name by an input component and the date by a component to choose the date).<br/>
:white_check_mark: - You should implement one ‘REMIND ME’ button per collection. Each button should send the emails for that specific collection (meaning with the appropriate name / launch date).<br/>

### **ASSUMPTIONS**

- There are two possible status for the collection launch date: A specific date, or a date TBD (date is null).
- Launch date of a collection can be changed! Let’s say a collection had as launch date 30/06/2022 at 14:30 GMT. If a user selects to be reminded, and then the launch date changes to 02/06/2022 at 18:00 GMT, then the email sent 30 min before should be sent on 02/06/2022 at 17:30 GMT and not on 30/06/2022 at 14:00 GMT.
- If a collection launch date changes from a specific time to TBD, then the emails will be sent once the launch date is changed again to a specific launch date (can be different than the original).

# TASK 2 - NFT REVEAL EXPERIENCE (FRONTEND ORIENTED).

### **OVERVIEW**

One of the most anticipated moments after buying an NFT is having a cool reveal experience of the NFTS that were minted. In this task we will create a very simple reveal experience for the user.

### TASK DESCRIPTION

:white_check_mark: - Check the Figma at the bottom of this page and build the Frontend reveal experience for the user.<br/>
:white_check_mark: - You will need to display 4 images. Each of them will be blurred in the beginning. When hovering over the image, the text ‘CLICK TO REVEAL’ should appear on top of the cursor. When clicking, the image becomes gradually unblurred (the transition time should be 1500ms).<br/>

### **TECH STACK**

**FRONTEND**

:white_check_mark: - To be done in React.js or Next.js with Typescript.<br/>
:white_check_mark: - Styling using Tailwind CSS. Responsive design is a must, and Tailwind makes this fairly easy.<br/>
:white_check_mark: - Big plus if you use any known query libraries such as Apollo or React Query.<br/>
:white_check_mark: - There should be a clear separation of all functional components. Special types and interfaces should be defined when possible.<br/>
:white_check_mark: - (Recommended) Using GraphQL<br/>

**BACKEND**

:white_check_mark: - To be done in Nest.js with Typescript.<br/>
:white_check_mark: - You can define a PostgreSQL database to store any relevant data for this task.<br/>
:white_check_mark: - For Task 1, we recommend using nodemailer to send the emails.<br/>
:white_check_mark: - (Recommended) Using GraphQL<br/>