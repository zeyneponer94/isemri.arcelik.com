package com.captcha.botdetect.examples.angularjs.basic_form;

import com.captcha.botdetect.web.servlet.SimpleCaptcha;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BasicServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        
        response.setContentType("application/json; charset=utf-8");
        
        
        JsonParser parser = new JsonParser();
        JsonObject formDataObj = (JsonObject) parser.parse(request.getReader());
        
        String captchaId = formDataObj.get("captchaId").getAsString();
        String captchaCode = formDataObj.get("captchaCode").getAsString();
        
        // validate captcha
        SimpleCaptcha captcha = SimpleCaptcha.load(request);
        boolean isHuman = captcha.validate(captchaCode, captchaId);
        
        if (isHuman) {
            // Captcha validation passed
            // TODO: do whatever you want here
        }
        
        // the object that stores validation result
        BasicValidationResult validationResult = new BasicValidationResult();
        validationResult.setSuccess(isHuman);
        
        try {
            // write the validation result as json string for sending it back to client
            out.write(gson.toJson(validationResult));
        } catch(Exception ex) {
            out.write(ex.getMessage());
        } finally {
            out.close();
        }
    }
}
