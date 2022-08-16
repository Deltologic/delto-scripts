/**
 * Delto Scripts
 * Hub for open-source automation scripts.
 * https://github.com/Deltologic/delto-scripts
 *
 * Started and maintained by Deltologic. Supported by community.
 **/

import { Client } from "@notionhq/client";
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import multer from "multer"

// define server main settings and credentials to Notion
const PORT = 8080
const NOTION_API_KEY = 'secret_*************'
const DATABASE_ID = 'cb************'

// create connection to Notion
const notion = new Client({ auth: NOTION_API_KEY })

// initialize express.js app
const app = express()

// add required middleware to be able to parse request body in different formats
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().array())

// it is required if we want to make request from different domain
app.use(cors())

// main api route for handling requests
app.post('/notion', async (req, res) => {
    // every ticket in notion must have title
    if (!('ticket_name' in req.body)) {
        res.sendStatus(400)

        return
    }

    // array with paragraphs
    let contentBlocks = [createBlockObject(`Page created by API\n`)]

    // iterate through every field from request body
    for (const key in req.body) {
        // ticket_name is already included above
        if (key === 'ticket_name') {
            continue;
        }

        // for each field in e.g. form, create paragraph and show its content
        contentBlocks.push(createBlockObject(`${key.toUpperCase()}:\n${req.body[key]}\n`))
    }

    try {
        // method for creating tickets/pages in Notion
        await notion.pages.create({
            "icon": {
                "type": "emoji",
                "emoji": "💌"
            },
            "parent": {
                "type": "database_id",
                "database_id": DATABASE_ID
            },
            "properties": {
                // "Name" field is default name of title field in default database,
                // if you have different name for title field, you must change it
                // e.g. if your title field is called "Client ID",
                // you should replace below "Name" with "Client ID"
                "Name": {
                    "title": [
                        {
                            "text": {
                                "content": req.body['ticket_name']
                            }
                        }
                    ]
                },
            },
            // "children" is place, where ticket content is showed
            "children": contentBlocks
        })
    } catch (e) {
        // in case of error, catch it and return 500
        res.sendStatus(500)

        return
    }

    // everything is fine and ticket have been created
    res.sendStatus(200)
})

// now server is working and listening to given PORT
app.listen(PORT, () => {
    console.log('Notion endpoint is working')
})

// helper function for creating paragraphs in Notion tickets body (content)
function createBlockObject(content) {
    return {
        "object": "block",
        "paragraph": {
            "rich_text": [
                {
                    "text": {
                        "content": content
                    }
                }
            ],
            "color": "default"
        }
    }
}
