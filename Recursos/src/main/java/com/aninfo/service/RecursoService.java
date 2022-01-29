package com.aninfo.service;

import com.aninfo.exceptions.LegajoNotFound;
import com.aninfo.model.Recurso;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class RecursoService {

    public Collection<Recurso> getRecursos() throws Throwable {

        String urlString = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos";
        URL url = new URL(urlString);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line+"\n");
        }
        br.close();
        Gson json = new Gson();
        Recurso[] ret = json.fromJson(sb.toString(), Recurso[].class);

        con.disconnect();
        return Arrays.asList(ret);

    }


    public Recurso getRecursoByLegajo(long legajo) throws Throwable {
        Collection<Recurso> recursos = getRecursos();

        Recurso ret =recursos.stream().filter(t -> t.getLegajo() == legajo).findFirst().orElse(null);
        if (ret != null)
            return ret;
        throw new LegajoNotFound("El legajo solicitado no existe");
    }

}
