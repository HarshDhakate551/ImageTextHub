# ImageTextHub

##Basic Idea of Project
Various times you click screenshot beacase you to store some text and is costly on memory to keep then so this project use TeseractJS an **ORM** to extract text from the image and store it in the database.
I know the flaw that what if i don't delete uploaded iamge in application, i trying to resolve that issue myself which make take some time

### How to use it
1. Download the Project to your system.
2. open the project in **VS Code** or any other editor and in terminal write **npm init i** *(Given you have npm installed else get it installed as well as node)*.
3. Create an **.env** file an provide value of **PORT**= ***(Desired values)*** similarly for **database_name** variable in that folder Below is refrence.
     >PORT = 6500
     >database_name = TextORM  
4. Now to **Host** the Application type **npm run nodemon** *(it will even Bypass the script permision denied error of windows, no idea of linux or mac)*.
5. Open your **Browser** an write ***localhost:(The passed port no. in env)***.

**TADA!!! You have Hosted the downloaded project atlest thats what i think**.

### Issue and their sollution which i know
1. When **Deleting files** make sure no. is not less than 0 or it's not an number which is not present in SrNo i'e; SrNo. of DataBase i created , ***Both the SrNo are interlinked***.
2. If you uploaded somthing to the folder via **Uploads** you have to ***Manually Delete*** it from the folder of **uploads** whose location is routes->uploads.
3. 3.The **FrontEnd** is not mobile Friendly and i know it, If you can *correct* it feel free to make changes
