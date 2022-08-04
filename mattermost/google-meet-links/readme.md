# Create Google Meet link in Mattermost
## Description
Simple _Slash Command_ implementation for creating Google Meet links direclty from any Mattermost chat.

> **Note:** \
> Due to Google Meet limitations the user who starts the meeting via generated link must have Google Workspace license.

## Configuration in Mattermost
1. Create new _Slash Command_:
    - use the name and trigger word of choice
    - specify request url matching the location of your server, for example: `https://1.2.3.4:8080/api/mattermost/meet`
2. Copy the _Token_ value and paste it as a value of `MATTERMOST_TOKEN` variable.

## Languages
### Python
#### Dependencies
The script uses:
- requests,
- Flask.

`pip install flask requests`

#### Build & Run
To run the server type: `python mattermost-google-meet-links.py` 


### JavaScript
#### Build & Run
_contributions are welcome_
