# CafeMaddyCab
![example workflow](https://github.com/jrobsontull/CafeMaddyCab/actions/workflows/frontend-linting.yml/badge.svg) 
![example workflow](https://github.com/jrobsontull/CafeMaddyCab/actions/workflows/npm-production.yml/badge.svg)

Cab rides for Asian women, Asian LGBTQ, Asian elderly in NYC in need. MERN stack app built for a non-profit to distribute Lyft/Uber codes to those in need.



## Wireframes for Website

User frames were designed in Figma. We will generally be following the ideas layed out [here](https://www.figma.com/file/XjOnppDlrB429hCCZqBMWp/CafeMaddyCab-Production).

## Local Machine Set Up

### Prerequisites

1. Node and npm are installed. Here are the versions used to develop the app:


        $ node --version
        v17.3.0
        
        $ npm --version
        8.3.0

### Install

1. Clone the git repo to your local machine.

        git clone https://github.com/jrobsontull/CafeMaddyCab.git
        
2. `cd` into the frontend folder and type:

        npm install

3. `cd` into the backend folder and type:

        npm install
        
4. Be careful not to run `npm install` in the root directory - this `package.json` is for the deployment builds only.
5. I use VSCode for editing and have the `prettier` extension installed for code formatting **on save**. I have it configured to format the code on save. To set this up in the same way, go to the `Extensions` tab and install `Prettier - Code formatter`.
7. Then go to `Preferences` and then `Settings`, search for `prettier`.
8. Set the following settings for unified formatting:

        Enable: True
        Semi: True
        Single Quote: True
        Tab Width: 2
        Trailing Comma: es5
        Use Editor Config: True
        Use Tabs: False
        Default Formatter: Prettier - Code formatter

9. Alternatively, this Node.js project is configured to format files every time the servers are started.
10. You may also want to install the `Babel Javascript` extension, if you haven't already, for syntax highlighting.

### Set up environmental variables

1. You will need to create a `.env` file and `google-credentials.json` file in the root of the backend folder. The format of these will follow the `.example` files in the backend folder.
2. I will send you the contents of both files via Slack.
3. These need to be set up before running the backend server.

### Running

1. To start the backend locally, `cd` into the backend folder and type:

        npm run dev
 
2. To start the frontend locally, `cd` into the frontend folder and type:

        npm run all

## Deployment

1. SSH into server with RSA key.
2. `cd` into the CafeMaddyCab directory and pull new code with:

        git pull

3. `cd` into the `/frontend/` folder and run:

        npm install
        npm run build

4. `cd` into the `/backend/` folder and run:

        npm install

5. `cd` back to the root folder for the repo. Check that pm2 is installed by typing:

        pm2 status
        
6. If you get an error, run the following:

        npm install -g pm2

7. Then kill the current web server with:

        pm2 kill

8. Start the new web server from the root repo directory with:

        pm2 start npm -- start

9. You can also give the process a name with `pm2 start npm --name "app name" -- start`. Now save the process, so that pm2 knows what to restart on server reboot:

        pm2 save
        
10. Then enable pm2 on startup with:

        pm2 startup
        
Server logs can be viewed at any time with `pm2 logs`. If you need to temporarily stop pm2, you can do so with `pm2 stop PROCESS_NAME`. In the future I will prepare build scripts for this process.
