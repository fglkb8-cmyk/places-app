package com.example.places.service;

import com.example.places.repository.LoginRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /** ログインIDとパスワードが正しければ true */
    public boolean authenticate(String loginId, String password) {
        return loginRepository.findById(loginId)
                .map(login -> passwordEncoder.matches(password, login.getPassword()))
                .orElse(false);
    }
}
