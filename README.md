# Dashboard

A sample project for exploring Angular 4+ technology
Specifically single page webapp that retrieves data from a Metrics REST API.

### Requires
    node 11.6
    npm 6.8.0
    jdk 8
    maven 3

### To Run
api listens on port 8080 by default
ui is server at http://localhost:4200 by default

```
cd api/
mvn clean spring-boot:run -Dspring.profiles.active=template
cd ../ui/
npm install
ng serve
```