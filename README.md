# success-ticket

## Links

**surge**
https://success-ticket.surge.sh/#/log-in
**heroku**
https://cryptic-earth-46905.herokuapp.com/

**Web user management application that validate event tickets**

- **what?**
A project to create a web app that validates tickets for a different events.
These tickets must be validated behind a registered user, that user could have 2 rols/types.
- **why?**
Add another alternative solution.
Nowadays people that uses systems of access control need to have another choice than pistols.
It could be and cheaper and easy configuration.
Guarantees to have a workaround.
- **for who?**
For medium and small companies that need access control, or an alternastive to classic pistols.
For a company to have another product and generate more value.
- **with what**
Application based on jasvascript
MongoDB/Express/React/Node.js

_Let's go_

#### Data model
Before introduce the data model diagram we need to explain an easy sequence that will help to understand more easily the project.
``` 
User -> rol it web be gunticketer
Company -> companie where the user work
Event -> one of the attractions that the company have
Session -> an event could has one or multiple sessions
tickets -> tickets sold in that session
codes -> barcodes

User -> company -> event -> session -> tickets -> codes
``` 

**Diagram:**

![dataModel](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/data-model.png)

#### Graphic functional
After we defined the data model we wil start with mockups of the web application.

First of all we will specify that it is a responsive web and the functional graph of which we can see the workflow will be designed for mobile. 

![graphic_functional](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/02_insertuser.png)
![graphic_functional](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/03_validate.png)
![graphic_functional](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/04_validate.png)
![graphic_functional](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/05_user_actions.png)


**UML diagram:**

Technologies:
REACTJS -> NODEJS/EXPRESS - MONGO/MONGOOSE

UML:
![UML](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/uml.png)

Process diagram:
![Process](https://github.com/cdemiguel/succes-ticket/blob/develop/git-images/process.png)

**Work process:**

| Date          | Task      
| ------------- |:-------------:| 
| 14/03/2018      | Web app structure, Read only | 
| 16/03/2018      | Api client done, tested, insert fake data model in BBDD |   
| 19/03/2018 | OK process should be done, with input validation solution (list tickets, and manage user withouth error handling) |   
| 22/03/2018 | Error handling done |   
| 24/03/2018 | Little bit of TDD with Jasmine & start camera validation feature |   
| 26/03/2018 | Camera validation implementation |
| 28/03/2018 | Upload and functional tests, fix |    
| 30/03/2018 | Newspaper time |    


