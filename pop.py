import redis
import string

r = redis.Redis(host='localhost', port=6379, db=0)
con = 0

while True:
    try:
        data = r.brpop("q1")

        _a = list(data[1])
        _a.sort()
        con += 1

        if con % 50 == 0:
            print(".", end="", flush=True)

    except Exception:
        print("error")
