using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Logging;
using ServiceStack.Redis;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            LogManager.LogFactory = new ConsoleLogFactory();
            var log = LogManager.LogFactory.GetLogger("redistest");


            var redisManager = new RedisManagerPool("localhost?connectTimeout=1000");

            using (var redis = redisManager.GetClient()) {

                do {
                    var item = redis.BlockingPopItemFromList("q1", null);

                    String _v = item.ToString();
                    char[] _c = _v.ToCharArray();

                    Array.Sort<char>(_c);

                    if (_c[0] == null) {
                        System.Console.WriteLine(_c[0]);
                    }

                } while (true);
            }

        }
    }
}
