import redis
import string

r = redis.Redis(host='localhost', port=6379, 
    decode_responses=True)

ps = r.pubsub()

ps.subscribe('simple')

for msg in ps.listen():
    if (msg['type'] == 'message'):
        print('data>', msg['data'])
