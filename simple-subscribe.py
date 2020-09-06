import redis
import string

r = redis.Redis(host='localhost', port=6379, db=0)
ps = r.pubsub()

ps.subscribe('simple')

for new_message in ps.listen():
    print(new_message)
