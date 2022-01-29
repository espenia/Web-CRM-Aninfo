package com.aninfo;

import com.aninfo.model.Recurso;
import com.aninfo.service.RecursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@SpringBootApplication
@EnableSwagger2
public class RecursoController {

	@Autowired
	private RecursoService recursoService;

	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(RecursoController.class, args);
	}

	@GetMapping("/recursos")
	public Collection<Recurso> getRecursos() throws Throwable {
		return recursoService.getRecursos();
	}

	@GetMapping("/recursos/{legajo}")
	public ResponseEntity<Recurso> getRecurso( @PathVariable long legajo) throws Throwable {
		Optional<Recurso> recurso =  Optional.of(recursoService.getRecursoByLegajo(legajo));
		return ResponseEntity.of(recurso);
	}

	@Bean
	public Docket apiDocket() {
		return new Docket(DocumentationType.SWAGGER_2)
			.select()
			.apis(RequestHandlerSelectors.any())
			.paths(PathSelectors.any())
			.build();
	}
}
