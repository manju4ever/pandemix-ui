# Pandemic Tracker

<img src="https://github.com/manju4ever/pandemix-ui/blob/master/images/Screen1.jpg" width="100" />   <img src="https://github.com/manju4ever/pandemix-ui/blob/master/images/maps.jpeg" width="110" />  <img src="https://github.com/manju4ever/pandemix-ui/blob/master/images/no-of-affected.jpeg" width="120" />    <img src="https://github.com/manju4ever/pandemix-ui/blob/master/images/heatmap.jpeg" width="108" />      <img src="https://github.com/manju4ever/pandemix-ui/blob/master/images/app-notifications.jpeg" width="110" /> 


## [Demo Video Link](https://youtu.be/k4Y7OJoEiTk "redirects to youtube")

### Why did we develop this application?

Kindly take 2 minutes of your time to watch the demo video where we explained why did we develop this application.

## [Product Explanation Video](https://youtu.be/RbR7SC-k07o "youtube")


# PROBLEM
The challenge for Indian and Karnataka Government is, tracking the people who came in contact with COVID-19 positive person in past 14 days.

# SOLUTION
An application called 'Pandemic Tracker' is developed. The Goal is to track the people who were in contact with the COVID-19 positive tested person in the past 14 days.

## Application Screens

# WORK-FLOW
  *	User Downloads the Application. 
  *	A unique identification number is tagged to the user.
  *	Registers with his mobile number. (We want to avoid this going forward)
  *	Login.
  *	Turn-on GPS Location.
  *	Redirect to the Landing page.
  *	Our application scans his surrounding to check if the user is surrounded by any COVID-19 person.
  *	Minute the user login into our application, we start continuously track his location.
  *	When the user updates the COVID-19 status to positive, in the backend we fetch the users who were at 2 meters distance from him in the last 14 days with respect to the time and travel history. 
  *	A notification (via call & text message) will be sent to all the users who were at 2-meter distance. 
  *	The same report will be sent to concerned government authority.
  *	The Web application is being developed by the team, only for government officials to keep track of the COVID-19 positive people and all the possible victims in real-time.
      *	The officials can filter the data according to State/ City/ Postal Code. (This is under development)

# User Workflow Screens

<img src="https://github.com/manju4ever/pandemix-ui/blob/master/images/Pandemic_UI.PNG" width="400" />

# ADVANTAGES
The application is beneficial to both government and public. 
  *	It adds value to the government in the following areas:
    *	To do root cause analysis of the person might have got contagious. 
      *	Example: After a week a particular street is marked danger zone, we can figure out who were the people who were exposed in that particular area in the past N number of days. 
      *	The web application will be provided to the responsible government officials to pull the results of the facts mentioned in the above point. 
    *	Trace out all the possible victims (users who might have come in contact with COVID19 +ve person in past 14 days) immediately. Concerned authorities get all the victim’s mobile numbers. This Information is not reviled to the user.
    *	Track the real-time movements of the COVID-19 positive person and Victim. 
    *	Age of the users who were most affected.
    *	If the user was suffering from any chronic diseases before.
    *	What was the primary symptoms the user started showing.
    *	All the possible ad-hoc analysis on the data we collect. Helps us to make quick data driven decisions.
    *	It adds value to the Public in the following areas:
    *	Get the latest updates from the Governments, This helps the user listen only true facts. 
    *	Check if the area user is travelling is safe or not or How safe it is?
    *	Get real-time notifications if the user has crossed the paths with COVID-19 person.
    *	Check how many COVID-19 victims the user is surrounded with at his current location.

# CAVEATS
There are few limitations of the application we have developed. Few of them can be achieved with the help of Government and few are really very tough to overcome.
  *	It is responsibility of the user to be very careful before user updates the COVID-19 Status to positive.
  *	Difficult to find the location history of the people who are already COVID-19 positive.
  *	Zero network coverage area 
  *	Human errors
  *	GPS switched off 
  *	Switched off Phone
  *	Movement without phones
  *	USER Acceptance to install the application
  *	No update or False Update. This might be a serious threat. (We have the work around for it but requires a bit of extra efforts.) (Strongly educate the people on it)
  *	Inability to track from Contact Surfaces (e.g. live virus on a metal surface)

# FUTURE SCOPE
We are planning to add the additional functionalities to the application but as we are only 3 in a team it is really tough for us to achieve at this moment. If provided with some funds (Only for the application development, not for our efforts) and time we are confident that we can achieve it. 
  *	Keep track of victim’s health on a daily basis.
  *	Integrated the COVID-19 hospitals/test centers with our App. (Can be done now as well by providing the redirects to these websites)
  *	If Govt provides the data of the all the COVID-19 positive people and Quarantined people, then it will be shown on the map.
  *	An alert to be sent if the user is surrounded by COVID-19 positive person within 500 meters range.
  *	Measure the body temperature of the user if the user device has heat sensors and allow user to synchronize, he/she’s smart watch with the application.

# USER RETENTION
To keep the user engaged with the application we will keep pushing him the local notifications (sent from the Client Side), Latest news and updates from the government and Global notifications (sent from the Server Side).

# What we need from you?
*	Kindly share this with your friend and family who might be interested to contribute for the welfare of the society.
*	We are highly motivated to share our codebase with the community and request you to improve in any way possible.
*	Develop a calling facility within the application. Ex: if we detect any person was in contact with COVID-19 positive person in past 14days, we would like to alert him by providing in app calling facility. By this we can achieve the highest security level, by not collecting any information (phone number, email id) from the user.


This is implemented ijn react-native. The Android build is ready and iOS build will be released soon.

 



