// ConsoleApplication1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include "pch.h"

#include <iostream>
#include<stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <WinSock2.h>


#include "cpp_redis/cpp_redis.h"

#include "spdlog/spdlog.h"
#include "spdlog/sinks/basic_file_sink.h"

std::condition_variable should_exit;

void
sigint_handler(int) {
	should_exit.notify_all();
}


int main()
{
	//! Windows netword DLL init
	WORD version = MAKEWORD(2, 2);
	WSADATA data;

	if (WSAStartup(version, &data) != 0) {
		std::cerr << "WSAStartup() failure" << std::endl;
		return -1;
	}

	spdlog::info("Welcome to spdlog!");

	cpp_redis::client client;

	client.connect();

	//signal(SIGINT, &sigint_handler);

	cpp_redis::subscriber sub;

	sub.connect("127.0.0.1", 6379);

	sub.subscribe("q1", [](const std::string& chan, const std::string& msg) {
		std::cout << "MESSAGE " << chan << ": " << msg << std::endl;
	});

	std::mutex mtx;
	std::unique_lock<std::mutex> l(mtx);
	should_exit.wait(l);

	client.disconnect();
	WSACleanup();
	
	return 0;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
