package com.role.net.RoleNet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(scanBasePackages = "com.role.net")
@EnableAsync
public class RoleNetApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoleNetApplication.class, args);
	}

}