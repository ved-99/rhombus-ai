First time setup:
Install VS code and clone/open the project folder
For frontend:
Open terminal and navigate to student_industry folder using command $ cd student_industry.
To confirm we install correct packages for React, we remove node_modules folder by using $ rm -rf node_modules command.
Also remove package-lock.json file if present by $ rm -rf package-lock.json
Now reinstall React packages (node_modules) by running $ npm install command.
To run the ReactJS application use the command $ npm start.
For backend:
Open terminal, make sure you are the parent folder of the project
Run the following commands:
$ cd powerpuff
$ pip install virtualenv
$ python -m venv env
$ source env/bin/activate
After you have entered all the details, run: $ python3 manage.py runserver
If all the above steps are not working, run the top most 4 commands as mentioned and then do the following:
$ pip install -r requirements.txt
$ python3 manage.py makemigrations
$ python3 manage.py migrate
$ python3 manage.py runserver


