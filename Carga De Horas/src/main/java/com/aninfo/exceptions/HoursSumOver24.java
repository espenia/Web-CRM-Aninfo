package com.aninfo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class HoursSumOver24 extends RuntimeException {

    public HoursSumOver24(String message) {
        super(message);
    }
}
