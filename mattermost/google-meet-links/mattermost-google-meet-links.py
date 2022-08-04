# Delto Scripts
# Hub for open-source automation scripts.
# https://github.com/Deltologic/delto-scripts
# 
# Started and maintained by Deltologic. Supported by community.


from flask import Flask, request, Response
from time import time
import requests
import os

_MATTERMOST_TOKEN = os.environ.get('MATTERMOST_TOKEN')
_MATTERMOST_TOKEN_HEADER = f'Token {_MATTERMOST_TOKEN}'


app = Flask(__name__)


@app.route('/mattermost/meet', methods=['POST'])
def google_meet_link():
    # verify if the request comes fomr Mattermost (optional)
    token = request.headers['AUTHORIZATION']
    if token != _MATTERMOST_TOKEN_HEADER:
        return Response(status=403)

    # generate meeting name
    user = request.form['user_name']
    channel = request.form['channel_name']
    timestamp = int(time())
    name = f'{user}-{channel}-{timestamp}' if len(channel) < 30 else f'{user}-{timestamp}'

    # create Google Meet link
    link = f'https://g.co/meet/{name}'

    # create chat message
    message = f'Your meeting: {link} (started by _{user}_)'

    # create send  api response for Mattermost
    chat_response = {"response_type": "in_channel", "text": message}
    requests.post(url=request.form['response_url'], json=chat_response)

    # return 200 OK
    return Response(status=200)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
