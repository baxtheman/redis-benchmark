2020-09-23
Treviso

Daniele Baggio
@baxtheman




# REDIS, introduzione e uso come coda di messaggi

## Remote Dictionary Server

- https://redis.io/   https://github.com/redis/redis

- BSD-licensed open-source, 45K GitHub stars 
- written in C language by Salvatore Sanfillipo @antirez
- first released on May 10, 2009

- The data model is key-value

- many different kind of values are supported: Strings, Lists, Sets, Sorted Sets, Hashes, Streams, HyperLogLogs, Bitmaps

- in-memory

- atomic operations

- can persist on disk

- Redis is a NoSQL database system

- no native GUI, only CLI


## Large adoption

Uber Airbnb Pinterest Instagram Udemy Hey Patreon
Twitter Shopify Slack Instacart GitHub Trello Imgur
Weibo Snapchat Craigslist Digg StackOverflow Kickstarter
.......
4,107 companies reported using Redis on StackShare
....
stackoverflow.com has 20k questions

## Look inside

    dump.rdb
    redis-benchmark.exe
    redis-cli.exe
    redis-server.exe
    redis.conf
    server_log.txt






## Communication

- a protocol called RESP (REdis Serialization Protocol). While the protocol was designed specifically for Redis

- RESP is binary-safe 

- A client connects to a Redis server creating a TCP connection to the port 6379.

- simple request-response protocol (with some exceptions)

- pipelining , Pub/Sub channel (push protocol)




## Clients

ActionScript ActiveX/COM+ Bash Boomi 
C C# C++ 
Clojure Common Lisp Crystal D Dart Delphi Elixir emacs lisp Erlang Fancy gawk GNU Prolog Go Haskell Haxe Io 
Java 
Julia Lasso Lua Matlab mruby Nim 
Node.js 
Objective-C OCaml Pascal Perl PHP PL/SQL Pure Data 
Python 
R Racket Rebol Ruby Rust Scala Scheme Smalltalk Swift Tcl VB VCL Xojo Zig



## How is made

- ANSI C only

- Works in most POSIX systems like Linux, xBSD, OS X

- There is no official support for Windows builds (_last version for Windows is 3.6, instead use docker_)

- Redis operates as a single process and is single-threaded *I LIKE*

- A single Redis instance cannot use parallel execution of tasks

- all atomic operations *I LIKE*




## Memory

- An empty instance uses ~ 3MB of memory.  *I LIKE*

- 1 Million Keys -> Hash value, representing an object with 5 fields, use ~ 160 MB of memory

- no more physical memory? usually the server will start swapping...

- max limit to memory usage by conf (f this limit is reached Redis will start to reply with an error)

- SET / GET key with string value
Strings, which can contain any data type, are considered binary safe and have a maximum length of 512MB




## Benchmark?

	$ ./redis-benchmark.exe GETSET
	====== GETSET ======
	100000 requests completed in 1.17 seconds
	50 parallel clients
	3 bytes payload
	keep alive: 1

	98.84% <= 1 milliseconds
	99.96% <= 2 milliseconds
	100.00% <= 2 milliseconds
	85470.09 requests per second

(i5 2.8Ghz)

## Persistence

- memory first, then disk snapshot

- Redis cares to store data on disk, even if they are always served and modified into the server memory. This means that Redis is fast, but that is also non-volatile.

- on-disk storage formats (RDB and AOF) don't need to be suitable for random access, so they are compact

- Redis background saving process is always forked when the server is outside of the execution of a command




## Is a database?

- What is a database for you?

- non safe but very efficient ... safe but not very efficient

- Redis is not a transactional database (no ACID)

- There is no rollback

- Isolation is always guaranteed at command level

- Foreign key? Referential Integrity? NEIN




## High availability (offtopic)

- Partitioning
- Cluster


## Commands

- every command is an atomic operation

- value is a binary safe string




### Pub/Sub


- Redis is a fast and stable Publish/Subscribe messaging system *I LIKE*

### Using Redis as an LRU cache

- The LRU caching scheme is to remove the least recently used frame when the cache is full and a new page is referenced which is not there in cache



### Transactions

- execution of a group of commands in a single step, with two important guarantees:

	- All the commands in a transaction are serialized and executed sequentially
	- Either all of the commands or none are processed
	- so a Redis transaction is also atomic

```
	> MULTI
	OK
	> INCR foo
	QUEUED
	> INCR bar
	QUEUED
	> EXEC
	1) (integer) 1
	2) (integer) 1
```


## Whe want use cases !!

- Session Cache: Many websites leverage Redis Strings to create a session cache to speed up their website experience 

- Leaderboards: Forums like Reddit and other voting platforms leverage Redis Lists to add articles to the leaderboard and sort by most voted entries.

- Many online stores use Redis Sets to analyze customer behavior, such as searches or purchases for a specific product category or subcategory

- Redis Sets are a great tool for developers who want to analyze all of the IP addresses that visited a specific website


- User Profiles: Many web applications use Redis Hashes for their user profiles

- User Posts: Social platforms like Instagram leverage Redis Hashes to map all the archived user photos or posts back to a single user. The hashing mechanism allows them to look up and return values very quickly, fit the data in memory, and leverage data persistence in the event one of their servers dies.

- Q&A Platforms: Many Q&A platforms like Stack Overflow and Quora use Redis Sorted Sets to rank the highest voted answers for each proposed question to ensure the best quality content is listed at the top of the page.