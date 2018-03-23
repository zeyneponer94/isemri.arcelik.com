package com.captcha.botdetect.examples.angularjs.contact_form;

import com.captcha.botdetect.web.servlet.SimpleCaptcha;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ContactServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        Map<String, String> errors = new HashMap<String, String>();
        
        response.setContentType("application/json; charset=utf-8");
        
        JsonParser parser = new JsonParser();
        JsonObject formDataObj = (JsonObject) parser.parse(request.getReader());
        
        String name = formDataObj.get("name").getAsString();
        String email = formDataObj.get("email").getAsString();
        String subject = formDataObj.get("subject").getAsString();
        String message = formDataObj.get("message").getAsString();
        String captchaId = formDataObj.get("captchaId").getAsString();
        String captchaCode = formDataObj.get("captchaCode").getAsString();
          
        if (!isValidName(name)) {
            errors.put("name", "Name must be at least 3 characters.");
        }
        
        if (!isValidEmail(email)) {
            errors.put("email", "Email is invalid.");
        }
        
        if (!isValidSubject(subject)) {
            errors.put("message", "Subject must be at least 10 characters.");
        }
        
        if (!isValidMessage(message)) {
            errors.put("message", "Message must be at least 10 characters.");
        }
        
        if (!isCaptchaCorrect(request, captchaCode, captchaId)) {
            errors.put("captchaCode", "CAPTCHA validation failed.");
        }
        
        if (errors.isEmpty()) {
            // everything is ok
            // TODO: Insert form data into your database
        }
        
        // the object that stores validation result
        ContactValidationResult validationResult = new ContactValidationResult();
        validationResult.setSuccess(errors.isEmpty());
        validationResult.setErrors(errors);
        
        try {
            // write the validation result as json string for sending it back to client
            out.write(gson.toJson(validationResult));
        } finally {
            out.close();
        }
    }
    
   
    private boolean isCaptchaCorrect(HttpServletRequest request, String captchaCode, String captchaId) {
        SimpleCaptcha captcha = SimpleCaptcha.load(request);
        return captcha.validate(captchaCode, captchaId);
    }
    
    private boolean isValidName(String name) {
        if (name == null) {
            return false;
        }
        return (name.length() >= 3);
    }
    
    private boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        return email.matches("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$");
    }
    
    private boolean isValidSubject(String subject) {
        if (subject == null) {
            return false;
        }
        return (subject.length() > 9) && (subject.length() < 255);
    }
    
    private boolean isValidMessage(String message) {
        if (message == null) {
            return false;
        }
        return (message.length() > 9) && (message.length() < 255);
    }
}
