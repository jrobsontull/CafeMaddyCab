# CafeMaddyCab
![example workflow](https://github.com/jrobsontull/CafeMaddyCab/actions/workflows/frontend-linting.yml/badge.svg) 

Cab rides for Asian women, Asian LGBTQ, Asian elderly in NYC in need. MERN stack app built for a non-profit to distribute Lyft/Uber codes to those in need.



## Wireframes for Website

Web frames were initially designed in Figma, together with a designer. Higher quality frames can be viewed [here](https://www.figma.com/file/2FULSEWGQxaTDVjIg73pmY/CafeMaddyCab-Final-Designs?node-id=0%3A1).

<img src="https://i.imgur.com/RCPUOju.png" width=600/>

These frames were then used as a guide for all the frontend work.

## Local Machine Set Up

### Prerequisites

Node and npm are installed. Here are the versions needed to run the app:


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

1. You will need to create a `.env` file file in the root of the backend folder. The format of these will follow the `.example` files in the backend folder.
2. I will send you the contents of both files via Slack.
3. These need to be set up before running the backend server.

### Running

1. To start the backend locally, `cd` into the backend folder and type:

        npm run dev
 
2. To start the frontend locally, `cd` into the frontend folder and type:

        npm run all

## Deployment

1. SSH into server with RSA key.
2. `cd` into the CafeMaddyCab directory and run the following command:

        bash deploy.sh
                
The server status can be viewed at anytime with `pm2 status`.

Server logs can be viewed at any time with `pm2 logs`. If you need to temporarily stop pm2, you can do so with `pm2 stop PROCESS_NAME`. The daemon process can be killed with `pm2 kill`.

If you get an error saying that `pm2` cannot be found, run `npm install -g pm2`.
