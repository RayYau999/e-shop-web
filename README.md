# Getting Started with King Tsun's Shopping center

This project was created by King Tsun Yau to demonstrate main functions of a e-commerce web application
## How to start the porject

In the project directory, you can run:
### `npm install`
then

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Main functions (Will add more in the future)
```
1. Redux function to store customer's order (with persistant store)
```
- Go to Home Page
- Click "Add to cart" button in each product
- The ordered product details will store in redux
- Go to Cart Page
- You can see the ordered counts and product details in the page

2. Login function with Django backend
```
- Clone "https://github.com/RayYau999/DjangoProject.git" (my Django project)
- Run the Django project (refer to the Readme.md in the Django project)
- Go to Login Page ("https:localhost:3000/login")
- Register a new account (please call the register api for now, not implement in frontend yet)
- Enter the username and password you just registered
- Or you can bypass the authentication by clicking the "Bypass login button" button
```

3. Register function with Django backend
```
- Clone "https://github.com/RayYau999/DjangoProject.git" (my Django project)
- Run the Django project (refer to the Readme.md in the Django project)
- Go to Login Page ("https:localhost:3000/login")
- Click the "Register" button
- Enter the username and password you want to register (email is optional)
- Click the "submit" button
- back to the login page and enter the username and password you just registered
```
## Main library used
1. Meterial UI
2. React Bootstrap
3. Redux
4. Redux-toolkit
3. Redux-persist

## Deploy container to minikube cluster notes
1. Get into minikube docker environment (you can choose to copy docker desktop image to minikube docker or build image in minikube docker, I choose the second one)
   ```eval $(minikube docker-env)```
2. You may need to build react app by running ```npm run build``` if the dockerfile build image from local project build dict
1. cd to project folder and Create image ```docker build -t e-shop-web:latest .```
2. expose service ```minikube service e-shop-web-service```