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

const PORT = 8080
const NOTION_API_KEY = 'secret_*************'
const DATABASE_ID = 'cb************'

const notion = new Client({ auth: NOTION_API_KEY })
const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.post('/notion', async (req, res) => {
    if (!('ticket_name' in req.body)) {
        res.sendStatus(400)

        return
    }

    let contentBlocks = [createBlockObject(`Page created by API\n`)]

    for (const key in req.body) {
        if (key === 'ticket_name') {
            continue;
        }

        contentBlocks.push(createBlockObject(`${key.toUpperCase()}:\n${req.body['key']}\n`))
    }

    try {
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
            "children": contentBlocks
        })
    } catch (e) {
        res.sendStatus(500)

        return
    }

    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log('Notion endpoint is working')
})

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
