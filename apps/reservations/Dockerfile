# Create the OS
FROM node:alpine AS development

# Create and set the working directory to /usr/src/app
WORKDIR /usr/src/app 

# Copy the package.json before running the pnpm install command
COPY package.json ./

# Copy the pnpm-lock.yaml before running the pnpm install command
COPY pnpm-lock.yaml ./

# Install pnpm globally to be able to run pnpm commands
RUN npm install -g pnpm

# This will install all the packages and create the node_modules folder
# But if the package.json is not present, this command will not work
# This command basically installs all the dependencies mentioned in the package.json
# So thats why we copy the package.json file first before running this command

# Also note, if you don't copy pnpm-lock.yaml file, this command will work... but
# it will take more time to install the packages probably 11s cuz it will install the packages from scratch
# But if you copy the pnpm-lock.yaml file, it will take less time to install the 
# packages probably 3s cuz it will install the packages from the lock file
# So thats why we copy the pnpm-lock.yaml file first before running this command
RUN pnpm install

# Copies all the files from the current directory to the /usr/src/app directory
# Also note, we'll not copy the node_modules folder, cuz it'll be created after running
# the pnpm install command. 
# So to achieve that, we'll add the node_modules folder to the .dockerignore file
COPY . ./

# This will run the build command mentioned in the package.json file
RUN pnpm run build


# --------------------------------------------


# Starts Stage 2 and Create the OS
FROM node:alpine AS production

# Declare a variable called NODE_ENV and set it to a value called "production"
ARG NODE_ENV=production

# Set the NODE_ENV environment variable to the value of the NODE_ENV variable
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

# This will install all the packages 
# The --prod flag tells pnpm to only install dependencies listed under the "dependencies"
# section of package.json, excluding those listed under "devDependencies".
RUN pnpm install --prod

# Copies the contents of the dist folder from the development stage to the 
# /usr/src/app/dist folder in the production stage
# The ./dist directory does not exist in the production stage, so it will be created first
# and then the contents of the dist folder from the development stage will be copied to it
COPY --from=development /usr/src/app/dist ./dist

# Run the command node dist/apps/reservations/main to start the application
# after the container has been launched and the image has been built
CMD [ "node", "dist/apps/reservations/main" ]

# Note:
# We could use the RUN command too, to run the node dist/apps/reservations/main command, but
# you typically want to use CMD to specify the command that starts your application 
# when the container is launched. This ensures that the application runs as expected
# when the container starts, which is the primary purpose of the container.
# The RUN command is used to run commands when the image is being built during the build process,
# The CMD command is used to run commands when the container is started after the image has been built.


# Run this command from inside the apps/reservations directory to build the image
# docker build ../../ -f Dockerfile -t sleepr_reservations