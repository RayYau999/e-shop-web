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

## Main library used
1. Meterial UI
2. React Bootstrap
3. Redux
4. Redux-toolkit
3. Redux-persist