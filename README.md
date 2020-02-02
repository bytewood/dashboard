# Dashboard

A sample project for exploring Angular 4+ technology.

Specifically single page webapp that retrieves data from a REST API providing sample metrics.

#### Currently implemented
UI
- Multiple graphs that can be added to a portal either individually or as groups via a menu.
- Services that retrieve data from a REST API and whos data is shared amongst several graphs

API
- dynamically generates a years worth of data.

#### Requires
- node 11.6
- npm 6.8.0
- jdk 8
- maven 3

#### To Run
*api listens on port 8080 by default*

*ui is served at http://localhost:4200 by default*

```
cd api/
mvn clean spring-boot:run -Dspring-boot.run.profiles=template

cd ../ui/
npm install
ng serve
```
