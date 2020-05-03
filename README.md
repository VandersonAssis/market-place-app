# market-place-app
This is the React frontend app I created to make it easier to consume the FULLY RESILIENT API. =]

# WARNING
This project has not been finished yet, it's not even deployable in Kubernetes by now, it's a work in progress. As soon as I have a 
final version for it, it will be deployable in Kubernetes and you'll be able to access it making use of all the <b>POWER</b> that 
our backend api provides.

#### Developer Info
Name: Vanderson Assis

E-Mail: assis.vanderson@gmail.com

Ps.: I'm currently living in Brazil but willing to relocate to another country. So if you have any opportunity you want to discuss, please reach out!

### Technologies Used System Wide
- React 16 (Frontend App)
- Java 12
- MongoDB
- Kubernetes (Container Orchestration)
- Docker (Containerization)
- Zipkin (Uses the Sleuth ids to present us the overall health of our rest calls)
- Sleuth (Adds trace ids on the rest calls. Helps a lot in finding bugs in microservices architecture)
- Kafka
- Zookeeper (Helps Kafka understand its current state, like brokers added/removed etc...)
- MySql (just to save trace logs generated by zipkin)
- RabbitMQ
- Netflix Ribbon (Load Balancing)
- Netflix Feign (Declarative rest calls - This will be separated in a different branch, since I'm coding the Kubernetes part now)
- Swagger (API documentation and API code generation)
- Spring
- Actuator (Used to display overall health and monitoring metadata of the system)
- Sonar (Helps on identifying code smells, test coverage and some more...)
- Jacoco (Allows to integrate our tests results in the sonar web app)
- Rest Assured (Api integration tests)
- Json Assert (Used to validate the returned Json with Regex)
- JUnit
- Mockito
- Gson
- Maven

### Deploy
Please follow the following repository's instructions https://github.com/VandersonAssis/market-place-kubernetes

### Info
The Market Place system is composed by four microservices that are:
market-place-products, market-place-purchase, market-place-orderprocessor 
and market-place-sellers. 
The project is internationalized, so whenever the need to add a new language arises, it'll be a lot easy to do it.
 
In the near future it will have a React frontend application. Further down are the links to their repositories.

Also, please find bellow the system's diagram. It will help further on how things 
happens "behind the curtains".

### How to
<b>After</b> you've followed all the steps on the <b>deploy</b> section, then the system should be up and running already so;
everything starts on the sellers api, where a seller has to be registered through the 
`/market-place-sellers/marketplace/api/v1/sellers` endpoint. After a seller has been registered then we can 
register any number of products for that seller through the 
`/market-place-products/marketplace/api/v1/products` endpoint. After the products has been registered, then 
we can start selling them right away through the `/market-place-purchase/marketplace/api/v1/purchase/start`.
When you start a purchase, the inventory will be checked to see if we have the quantity required on the purchase, if so, it will be "locked", 
meaning even though the purchase is not finished yet, that quantity will be out of inventory until the purchase ends or fails. If it ends successfully, 
we're good,  if not, then the product quantity will be put in the inventory again.

The purchase process uses the RabbitMQ structure. So if an error happens on the purchase, the system will try again two times, if still, it doesn't work,
then an error will be returned and the message will be put in a dead letter queue to be reprocessed when the time is right.

Again, for more info on what happens on the backend part when we're calling those endpoints, please refer 
to the diagram bellow. Also all the documentations provided on the openapi.yaml files referenced bellow. 

<b>For more info</b> on the available endpoints, expected payloads, 
responses and so on, please refer to the swagger "openapi.yaml" file
located in the src/main/resources folder of each project. All you have to do is paste their content into 
`https://editor.swagger.io/`.

#### Accessing Support Projects
- To access the RabitMQ interface run `minikube service rabbitmq-service --url`, copy the address that ends with :31672 and access it with your browser.
  The user is guest and the password is guest.
  
- To access the Zipkin interface run `minikube service zipkin --url`, copy the address and access it with your browser.

#### Repositories
https://github.com/VandersonAssis/market-place-kubernetes

https://github.com/VandersonAssis/market-place-app

https://github.com/VandersonAssis/market-place-products

https://github.com/VandersonAssis/market-place-sellers

https://github.com/VandersonAssis/market-place-purchase

https://github.com/VandersonAssis/market-place-orderprocessor

https://github.com/VandersonAssis/market-place-exception-handlers

https://github.com/VandersonAssis/market-palce-integration-tests

#### Coming up
- Monitoring with Prometheus
- Api Gateway
- Security configurations

#### Disclaimer
This and any other piece of code belonging to the Market Place system is 
being created with intention to show interviewers my abilities creating 
a system using microservices architecture.

Also, please have in mind that 
I work on this project only on my free time, therefore, improvements can take a little while to be made.

Last but not least, feel free to do whatever the h311 you want with this code. =P

#### Diagram
![alt text](https://raw.githubusercontent.com/VandersonAssis/market-place-support-files/master/diagrams/system-diagram.png)