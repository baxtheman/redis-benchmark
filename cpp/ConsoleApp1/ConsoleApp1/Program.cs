using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost");

            IDatabase db = redis.GetDatabase();

            while (true) {

                RedisValue v = db.ListRightPop("q1");

                if (v.HasValue) {

                    String _v = v.ToString();
                    char[] _c = _v.ToCharArray();

                    Array.Sort<char>(_c);

                    if (_c[0] == null) {
                        System.Console.WriteLine(_c[0]);
                    }
                }
            }

        }
    }
}
