import redis
import string

r = redis.Redis(host='localhost', port=6379, db=0)


while True:
    try:
        data = r.brpop("q1")

        _a = list(data[1])
        _a.sort()
        #print(_a[:15])

    except Exception:
        print("error")

