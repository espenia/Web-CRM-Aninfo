package com.aninfo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class DateNotBeforeToday extends RuntimeException {

    public DateNotBeforeToday(String message) {
        super(message);
    }
}
