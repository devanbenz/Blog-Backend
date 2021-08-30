# Blog-Backend

### Blog Keeper! 
Application [frontend](https://github.com/devanbenz/Blog-Frontend) is written in React + Javascript. Backend of this application is written in Javascript + Express + Mongoose. 
CI/CD pipeline in progress, currently github actions will push docker image [blog-frontend](https://hub.docker.com/repository/docker/weblwabl/blog-frontend) to dockerhub. Github actions will also build and tag local image then push to Amazon Web Services Elastic Container Registry. 

- Bookmarks blogs and stores information in mongo db (mongoose ORM)
- User login and authentication system that utilizes JWT bearer token to view/store data
- *todo* Implement user signup (already implemented in backend)
- *todo* currently user data is stored in *localStorage* -- need to add redis database to store session data
- *todo* Finish Github actions pipeline to push frontend and backend containers to AWS ECS and deploy application to public cloud

#### ENV variables 

`SECRET` - Secret for JWT 
`PORT` - Backend express listener port *use 3005 as frontend is configured for 3005*
`MONGO_URI` - MongoDB uri -- I use atlas for a managed database 
