import redis
import string

r = redis.Redis(host='localhost', port=6379, db=0)
con = 0

while True:
    try:
        data = r.brpop("md5")

        _a = data[1]

        print(_a)

        if (con % 50 == 0) and (len(_a) > 0):
            print(".", end="", flush=True)

    except Exception:
        print("error")
