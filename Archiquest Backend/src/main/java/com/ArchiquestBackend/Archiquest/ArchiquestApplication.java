package com.ArchiquestBackend.Archiquest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@SpringBootApplication(scanBasePackages = "com.ArchiquestBackend.Archiquest")
public class ArchiquestApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArchiquestApplication.class, args);
	}

}
