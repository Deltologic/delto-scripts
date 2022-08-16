# Notion API - create generic tickets on form submission
## Description
A simple server that allows you to create tasks 
in the Notion system based on the request data. 
The server can be used, for example, when submitting 
a contact form on a page to create a task in the system.

## Video
https://user-images.githubusercontent.com/56962880/184115588-48f50925-8c10-4524-8616-00fd2e825752.mp4


## Languages
### Javascript (Node.js)
#### Dependencies
- [@notionhq/client](https://www.npmjs.com/package/@notionhq/client)
- [express](https://www.npmjs.com/package/express)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cors](https://www.npmjs.com/package/cors)
- [multer](https://www.npmjs.com/package/multer)


## Notion configuration
### Registering application
1. Go to [My integrations](https://www.notion.so/my-integrations) page.
2. Click _New integration_ button.
3. Check the _Insert content_ checkbox, fill rest of the form and click _Submit_.
4. Copy created access token as it is needed in application.

### Database access
Go to the page, where you want to store tickets from request. In right corner, 
click _Share_ button, type name you gave to integration, click on name and then _Invite_. Now everything is 
set up correctly.

## Code configuration
Replace `NOTION_API_KEY` variable with your access key and `DATABASE_ID` with
database id you want to use. Database id can be found in the link e.g. `https://notion.so/<database_id>`.

You can also switch server port by changing `PORT` variable. 

## Build & Run
To install dependencies, type in terminal
```bash
npm i
```

Then, to run script, type
```shell
node create-ticket.js
```

## Usage
Server parses `POST` request body (in JSON or urlencoded format) sent to `/notion` endpoint e.g. 
`http://localhost:8080/notion`. Every request must have `ticket_name` field
and the remaining fields (names can be totally custom) must contain only simple values (strings or numbers).

_Contributions are welcome_
