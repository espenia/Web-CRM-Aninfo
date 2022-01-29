package com.aninfo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class LegajoNotFound extends RuntimeException {
    public LegajoNotFound(String message){ super(message); }
}
