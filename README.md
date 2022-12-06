
Project Title
# MedConsult App

This is a MERN stack application which is based on booking appointment which includes doctor authentication, create profile,add prescription, add , dashboard with recent appointments, recent reviews and user authentication, appointment booking and cancel appointment, post review and delete review to a doctor profile by users.


Team Members
# 1. Raja Nikshith Katta
# 2. Sivanagendra Kanakababu Marada
# 3. Narasimha Reddy Potlapati
# 4. Satish Kumar Lokavarapu

# Install server dependencies
   cd backend
   npm install

# Install client dependencies
 cd client
 npm install
 
Inside client and backend
# npm start

# link for ppt pages
https://northeastern-my.sharepoint.com/:p:/r/personal/marada_si_northeastern_edu/_layouts/15/Doc.aspx?sourcedoc=%7Bdd9c0cf7-0c38-4387-8a38-0916693a5e6b%7D&action=edit&wdPreviousSession=aebdb6e9-c039-4901-bffa-a366523022d3&wdNewAndOpenCt=1670451642889&wdo=4&wdOrigin=wacFileNew&wdTpl=blank&wdLcid=1033&wdPreviousCorrelation=14d348e8-c51d-4e70-899f-8d34becb84cf&cid=71336889-22b9-4b18-842b-a1c18e0262f5

# Demo Video
https://northeastern.sharepoint.com/sites/Webdesign654/_layouts/15/stream.aspx?id=%2Fsites%2FWebdesign654%2FShared%20Documents%2FGeneral%2FRecordings%2FMeeting%20in%20%5FGeneral%5F%2D20221208%5F113130%2DMeeting%20Recording%2Emp4


# .env life
MONGODB_URL = 'mongodb://localhost:27017/medbud'
JWT_SECRET = 'medcare'

SERVER_URL = http://localhost:3000
STRIPE_PRIVATE_KEY = sk_test_51MBMQaA1LeCPNzFZbLE5CmljsQQnEjviVnVin6lW8VZKZlr6RqLnZdwbye5U04UlljW85lEud8PsUepGBvp5k69d00Q58dAGVb

KEY_ID = rzp_test_D3xhihABR4GwEo
KEY_SECRET = Y3KJe7C2xhid1Or4Z6bCGyqq
# Project description

One stop smart E medical consulting application that helps manage hospital appointment bookings all at one place

Workflow: System admin has all privileges. Initially, the system admin adds a hospital to the application in every city and community in his control. Followed by that, a doctor and a hospital admin are added. The doctor and hospital admin are assigned to a hospital created earlier. Lastly, a community admin and a person belonging to the community are added. A patient can view hospitals/doctors and contact them to schedule an appointment.

# User Requirements
Application: Upon login, every user is shown a different page, menu and options, depending on the user permissions. Using the application, System admin can perform all the functions. He can add a hospital, a doctor, a patient, a community admin, a hospital admin and also perform management functions such as removing, updating and viewing their information.

A patient can login and search for a specific hospital/doctor in a specific area. The patient can also view the hospital contact information.
Here we implement Location feature and search functionality to search hospitals under limited distance. Here we give payment functionality to the user too.
He can view hospitals rating and reviews. He can sort hospitals based on ratings and reviews, fast customer service, distance etc. 
Once the patient selects a doctor he can view available slots in real time
The appointments will work in a real time manner where once the patient succesfully books an apointment the doctors calendar will be blocked and other patient cannot book under the same slot.

A doctor can add a person in the community as a patient. He can then create an encounter to record the patient's vitals such as BP, weight etc. Moreover, the doctor can also view the patient's vital signs history for diagnosis.
Doctor can view all the appointments booked by patients under him.

A community admin can login and view all patients in a community. He can also add a new person in the community apart from the system admin, along with performing other tasks with respect to the person such as modify, view and delete.
Community admin can perform CRUD operations of hospitals, hospital admins, patients, doctors in that location.

Similarly, a hospital administrator can add a new doctor in a hospital. He can also perform other functions with respect to the doctors such as viewing a new doctor information, deleting a doctor and updating doctor information. Hospital administration can view analytics of the hospital data like number of patients in last one month, highest performing doctor, complaints raised information etc.

CRUD operations are implemented based on the user who has logged in. For example, a patient cannot perform CRUD functions. A hospital admin has limited CRUD permissions in the sense that he can only add/view/delete/edit a person in the community. While a system admin has all the CRUD operations.




