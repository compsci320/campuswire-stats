# IMPORTANT NOTE:

This is not the README for the project. The server file is only present so that the code for the API can be viewed. However, the API is currently being hosted on pythonanywhere.com which is what the frontend is connected to. Running the backend locally will not connect it to the frontend.

If you wish to connect the frontend to a local instance of the backend, go to ./src/service/HttpService.ts. Then uncomment line 1 and comment line 2.

In addition, all commands here are designed to be used with Windows Powershell. If you are using a different shell, you may have to look up equivalant commands. Because of this inconvenience, we decided to host it online so users do not need to run the API locally.

# Setting up the environment (no venv file present)

```sh
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt
```

# Setting up the environment (venv file present)

```sh
venv/Scripts/activate
```

# Downloading dependencies (after a git pull)

```sh
pip install -r requirements.txt
```

# Running the API

```sh
flask run -p 5001
```

