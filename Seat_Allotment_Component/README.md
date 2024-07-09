## Seat Allotment

### Steps to run the Project

- Clone the repo
  ```
  https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final.git
  ```
#### Run the following commands on the terminal

- Change the directory to the working directory

  ```
  cd Seat_Allotment_final
  ```

  ```
  cd client
  ```

  ```
  npm install
  ```

  ```
  npm install react-router-dom axios
  ```

- Run the client
  
  ```
  npm run dev
  ```

  ###### New terminal

  ```
  cd server
  ```

  ```
  npm init -y
  ```

  ```
  npm install express mongoose nodemon bcrypt jsonwebtoken cors dotenv cookie-parser
  ```
  
- Run the server
  
  ```
  npm start
  ```
A development server will be started

### Mongodb Atlas is used as the database
#### Refer the youtube link provided below to create a db and linking it to the project

  ```
  https://youtu.be/QyYMvdFwBKA?feature=shared
  ```

#### Steps to create and connect to Mongodb Atlas (if you are lazy to go through the video!)

- Go to the mongodb atlas website and create a free account, link is given below

  ```
  https://www.mongodb.com/
  ```

- Create a new project

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/a1a8643d-fa35-4a47-a2dd-856b2393e90e)

- Give a name for your project and click on 'Next'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/ccab432d-36ad-4871-8f29-d7c8816f3e0f)

- Add members to your project if needed and click on 'Create project'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/54aecb56-dbbe-4232-a521-349e42932c31)

- You should get this page once you have created the project, click on 'Build a Database'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/a3eb679a-7653-4504-9a16-fb0a33d2fb4d)

- You can use the paid or free-tier as per your project requirements, here we are using the M0 version (which is the free-tire)

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/ccaf2d9b-b972-4d50-959b-c0dae0e101a3)

- Don't change the 'Provider' and the 'Region', while changing the cluster name is optional. Click on 'Create'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/236df540-2f67-41d7-bf9c-a5426c2c0b7f)

- Create a user, (please remember username and password), click on 'Create User' 

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/761c6a23-9adb-4605-a796-a08d2e438b64)

- Choose 'My Local Environment'
- Click on 'Add My Current IP Address' which will add your current IP address, click on 'Finish and Close' > 'Go to Database'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/f20eadc1-9f32-4084-88e6-d530d741f196)

- Go to 'Network Access' tab under 'Security'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/a2f58a73-8378-4f5d-a0a9-0933bcd21e45)

- Click on 'Add IP Address' which should give a pop-up window as given in the picture below, and type '0.0.0.0/0' to allow access from anywhere. [!NOTE] This step is only required as per your project requirements only

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/dbdd8638-c853-4813-8080-c9c0b92d684c)

- Add the following code into the app.js (here it is index.cjs) file of your project

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/feadea67-9b38-4c5d-b696-51274b089cae)

- To connect to your project, go to the mongodb atlas and click on 'Connect' > 'Drivers'

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/620c5966-d8ec-4321-b5a8-438ff344006d)

- Copy the connection string for your application, click on 'Close' ( [!NOTE] Run ```npm install mongodb```, under the server directory if you don't have mongodb already installed )

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/7609d797-0238-41d8-8612-cb1281902c48)

- Paste the connection string and change your password in the app.js (here it is index.cjs) file

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/3438383f-297f-47fb-9c34-6419b357e8a3)

- Go to the mongodb atlas and click on 'Browse Collections' to view the collections

![image](https://github.com/Final-Year-Project-Team-3-CSE/Seat_Allotment_final/assets/97212540/b4c5be74-2aff-4805-94a5-fcf2823ddb7c)

To access the development server navigate to 'http://localhost:5173/Welcomepg'

- You can now either log in as admin or student

> [!NOTE]
>
> Admin username: `admin`
> Admin email:  `admin@example.com`
> Admin password: `password`
>
