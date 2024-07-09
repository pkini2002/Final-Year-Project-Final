### Registration Backend

> Steps to run the project

- Clone the repo

```
git clone https://github.com/SammithaS/Smart-student-admission-system-complete-.git
```

<br>

- Change the directory

```
cd Registration-Backend
```

<br>

- Install the Virtualenv

```
pip install virtualenv
```

<br>

>[!NOTE]
>
> The Project requires a Python11 version to run successfully

```
virtualenv -p "<Path to your Python11.exe>" venv
```

<br>

- Activate the Virtualenv

```
.\venv\Scripts\activate
```

<br>

- Install the necessary requirements

```
pip install -r requirements.txt
```

<br>

```
cd registration
```

<br>

- Make migrations/ Create db.sqlite3

```
python manage.py makemigrations
python manage.py migrate
```

<br>

- Create a super user. This is to access Admin panel and admin specific pages.

```
python manage.py createsuperuser
```

Enter your username, email and password.

<br>

- Run server

```
python manage.py runserver
```

A development server will start at the port 8000
<br>
Navigate to the url http://127.0.0.1:8000/ to view the application
