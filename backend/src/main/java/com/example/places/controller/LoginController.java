package com.example.places.controller;

import com.example.places.config.AuthInterceptor;
import com.example.places.dto.LoginRequest;
import com.example.places.dto.MessageResponse;
import com.example.places.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    /** POST /login ログイン */
    @PostMapping("/login")
    public ResponseEntity<MessageResponse> login(@Valid @RequestBody LoginRequest request,
                                                 HttpServletRequest httpRequest) {
        if (!loginService.authenticate(request.loginId(), request.password())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("ログインIDまたはパスワードが正しくありません"));
        }
        
        httpRequest.getSession(true);
        httpRequest.changeSessionId();
        httpRequest.getSession().setAttribute(AuthInterceptor.LOGIN_KEY, request.loginId());
        return ResponseEntity.ok(new MessageResponse("ログインしました"));
    }
}
