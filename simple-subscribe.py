import redis
import string
import json

r = redis.Redis(host='localhost', port=6379, 
    decode_responses=True)

ps = r.pubsub()

ps.subscribe('simple')

for msg in ps.listen():

    if (msg['type'] == 'message'):

        datajson = json.loads(msg['data'])
        print('get>', datajson)
