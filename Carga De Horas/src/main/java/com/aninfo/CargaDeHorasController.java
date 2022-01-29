package com.aninfo;

import com.aninfo.model.CargaDeHoras;
import com.aninfo.service.CargaDeHorasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
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
public class CargaDeHorasController {

	@Autowired
	private CargaDeHorasService cargaDeHorasService;

	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(CargaDeHorasController.class, args);
	}

	@PostMapping("/horas")
	@ResponseStatus(HttpStatus.CREATED)
	public CargaDeHoras cargar(@RequestBody CargaDeHoras carga) throws Throwable {
		return cargaDeHorasService.createCargaDeHoras(carga);
	}

	//@Deprecated
	@GetMapping("/horas")
	public Collection<CargaDeHoras> getCargas() {
		return cargaDeHorasService.getCargasDeHoras();
	}

	@GetMapping("/horas/legajo/{legajo}")
	public Collection<CargaDeHoras> getCargas(@PathVariable Long legajo) {
		return cargaDeHorasService.findByLegajo(legajo);
	}

	@GetMapping("/horas/legajo/{legajo}/fecha/{desde}/{hasta}")
	public Collection<CargaDeHoras> getCargasFilteredByDate(@PathVariable long legajo, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date desde, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date hasta) {
		return cargaDeHorasService.findByFechaBetween(desde, hasta, legajo);
	}

	@GetMapping("/horas/{id}")
	public ResponseEntity<CargaDeHoras> getCarga(@PathVariable Long id) {
		Optional<CargaDeHoras> cargaDeHorasOptional = cargaDeHorasService.findById(id);
		return ResponseEntity.of(cargaDeHorasOptional);
	}

	@DeleteMapping("/horas/{id}")
	public void deleteCarga(@PathVariable Long id) { cargaDeHorasService.deleteById(id); }

	@PutMapping("/horas/{id}")
	public ResponseEntity<CargaDeHoras> updateCarga(@RequestBody CargaDeHoras carga, @PathVariable Long id) throws Throwable {
		Optional<CargaDeHoras> cargaDeHorasOptional = cargaDeHorasService.findById(id);

		if (!cargaDeHorasOptional.isPresent()){
			return ResponseEntity.notFound().build();
		}

		carga.setIdCarga(id);

		cargaDeHorasService.validate(carga);

		cargaDeHorasService.save(carga);
		return ResponseEntity.of(cargaDeHorasOptional);
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
