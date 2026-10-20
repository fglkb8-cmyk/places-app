package com.example.places.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** login テーブル */
@Entity
@Table(name = "login")
public class Login {

    @Id
    @Column(name = "login_id", length = 50)
    private String loginId;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    protected Login() {
    }

    public Login(String loginId, String password) {
        this.loginId = loginId;
        this.password = password;
    }

    public String getLoginId() { return loginId; }
    public String getPassword() { return password; }
}
